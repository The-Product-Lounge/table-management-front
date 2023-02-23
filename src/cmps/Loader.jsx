import Rive from 'rive-react'
import tplLoader from '../assets/imgs/TPL Loader.riv'

export const Loader = () => {
  return (
    <section className="loader">
      <Rive style={{ height: '100px', width: '100px' }} src={tplLoader} />
    </section>
  )
}
