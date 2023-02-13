export const UserPreview = ({ user }) => {
  return (
    <section className='user-preview'>
      <img src={user.imgUrl} alt='' className='profile-img' loading='lazy' />
      <div className='user-details'>
        <p>
          <span className='first-name'>{user.firstName}</span> {user.lastName}
        </p>
      </div>
    </section>
  )
}
