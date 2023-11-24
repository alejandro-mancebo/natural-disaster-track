import { Link } from "react-router-dom"
export default function Page404() {
  return (
    <section className="h-[calc(100vh-72px)] bg-sky-200 ">
      <div className=" max-w-2xl mx-auto  p-32 border-2 border-neutral-400 rounded-xl bg-slate-200 text-center ">
        <h1 className=" text-6xl">404 Page</h1>
        <Link to="/">Go back</Link>
      </div>
    </section>

  )
}
