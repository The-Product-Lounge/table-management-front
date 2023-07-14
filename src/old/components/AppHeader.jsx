import Favicon from "../assets/imgs/Favicon.svg"

export const AppHeader = () => {
  return (
    <section className='app-header stretch'>
      <div className='main-content'>
        <div className='logo'>
          <img src={Favicon} />
        </div>
      </div>
    </section>
  )
}
