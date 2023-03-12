import Rive from "rive-react"
import tplLoader from "../assets/imgs/TPL Loader.riv"

export const Loader = ({ massage }) => {
  return (
    <section className='loader'>
      <div className='main-content'>
        <Rive style={{ height: "100px", width: "100px" }} src={tplLoader} />
        {massage && <p>{massage}</p>}
      </div>
    </section>
  )
}
