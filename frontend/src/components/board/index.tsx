import { useState } from "react";
import { useForm, useController } from 'react-hook-form'
import Select from 'react-select';
import { axiosPrivate } from "../../api/axios";

import { MarkerCoords, Disaster, Category } from "../../types";


const categories = [
  { value: "tornadoes", label: "Tornadoes and Severe Storms" },
  { value: "hurricanes", label: "Hurricanes and Tropical Storms" },
  { value: "floods", label: "Floods" },
  { value: "wildfires", label: "Wildfires" },
  { value: "earthquakes", label: "Earthquakes" },
  { value: "Drought", label: "Drought" },
];


interface Props {
  newMarker: MarkerCoords;
  showMarkers: boolean;
  setShowMarkers: (showMarkers: boolean) => void;
  showDisasterList: boolean;
  setShowDisasterList: (showDisasterList: boolean) => void;
}

export const Board = ({
  newMarker,
  showMarkers,
  setShowMarkers,
  showDisasterList,
  setShowDisasterList
}: Props) => {

  const [, setDisaster] = useState<Disaster>()
  const [hide, setHide] = useState(false);



  const form = useForm<Disaster>({
    defaultValues: {
      locationName: '',
      coordinates: [],
      category: '',
      description: '',
    },
  });
  const { register, reset, control, handleSubmit } = form;
  // const { errors } = formState;
  const { field } = useController({ name: 'category', control });


  const handleSelectChange = (option: Category | null) => {
    field.onChange(option?.value);
  }


  const onSubmitHandle = async (data: Disaster) => {

    if (data.locationName === '' || newMarker === undefined || data.category === '' || data.description === '') {
      reset();
      field.value = '';
      alert('Enter the values of the disaster')
      return;
    }

    const dataDisaster = localStorage.getItem('disasterData');
    const userId = localStorage.getItem('_id');
    // console.log('dataDisaster initial', dataDisaster?.length)

    // let idNumber: number;
    // if (dataDisaster !== null) {
    //   idNumber = dataDisaster.length + 1;
    // } else {
    //   idNumber = 1;
    // }

    if (!userId) return;

    const objectAddress: Disaster = {
      _id: newMarker['_id'],
      locationName: data.locationName,
      coordinates: newMarker['coordinates'],
      category: data.category,
      description: data.description,
      username: data.username,
      userId: userId,
      createdAt: data.createdAt,
    }

    setDisaster(objectAddress);

    if (dataDisaster !== null) {
      const disasterList = [...JSON.parse(dataDisaster), objectAddress]
      localStorage.setItem('disasterData', JSON.stringify(disasterList))
    } else {
      localStorage.setItem('disasterData', JSON.stringify([objectAddress]))
    }

    await axiosPrivate.post('/api/locations',
      JSON.stringify({ objectAddress }), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 201) {
          // Swal.fire({
          //   icon: "success",
          //   title: "Success...",
          //   text: "You are register successfully!",
          // });
          // navigate("/login");
          // console.log(response);
        }
      })
      .catch((error) => {
        let errorMessage;
        if (!error?.response) {
          errorMessage = 'No server response';
          console.error('No server response');
        } else if (error?.response.status === 409) {
          errorMessage = 'User exist';
          console.error('User exist');
        } else {
          errorMessage = 'Registration failed'
          console.error('Registration failed');
        }
        // Swal.fire({
        //   icon: "error",
        //   title: "Fail...!!!",
        //   text: errorMessage
        // });
      })


    reset();
    field.value = '';

    // window.location.reload();

  }


  return (
    <div className="board">
      <div className="data-input">
        <div className="board-header">
          <h3>Board</h3>
          <button className="board-button"
            type="button"
            onClick={() => setHide(!hide)}>{hide ? "x" : "-"}
          </button>
        </div>
        {hide &&
          <>
            <form className="board-form" onSubmit={handleSubmit(onSubmitHandle)}>
              <div>
                <label htmlFor="locationName">Location name
                  <input
                    type="text"
                    id="locationName"
                    {...register('locationName')}
                  /></label>
              </div>

              <div>
                <label htmlFor="category">Category</label>
                <Select className="categorySelect"
                  value={categories.find(({ value }) => value === field.value)}
                  onChange={handleSelectChange}
                  options={categories}
                  id="category"
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  {...register('description')}
                />
              </div>

              <button className=""
                type="submit"
              >Submit</button>
            </form>

            <div className="checkbox-container">
              <div className="layertoggle">
                <input
                  type="checkbox"
                  name="layertoggle"
                  id="layertoggle"
                  defaultChecked={true}
                  onChange={() => setShowMarkers(!showMarkers)}
                />
                <label htmlFor="layertoggle">Show Markers</label>
              </div>

              <div className="disaster-lists">
                <input
                  type="checkbox"
                  name="disaster-list"
                  id="disaster-list"
                  defaultChecked={true}
                  onChange={() => setShowDisasterList(!showDisasterList)}
                />
                <label htmlFor="disaster-list">Show disaster list</label>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
};
