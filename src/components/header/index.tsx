
interface Props {
  selectMyLocation: boolean;
  setSelectMyLocation: (selectMyLocation: boolean) => void;
}

export const Header = ({ selectMyLocation, setSelectMyLocation }: Props) => {

  function refreshPage() {
    window.location.reload();
  }

  function clickLocation() {
    setSelectMyLocation(!selectMyLocation)
    console.log('Click my location', selectMyLocation)
  }

  return (
    <div className="header" >
      <h3 className="logo mobile" onClick={refreshPage}>NDT</h3>
      <h3 className="logo pc" onClick={refreshPage}>Natural Disaster Track</h3>
      <nav>
        <ul>
          <li className="mobile" onClick={clickLocation}>{selectMyLocation ? "Hide " : "Show"}</li>
          <li className="pc" onClick={clickLocation}>{selectMyLocation ? "Hide my location" : "Show my location"}</li>
        </ul>
      </nav>
    </div>
  );
};
