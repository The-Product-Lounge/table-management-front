export const FillDetails = () => {
  return (
    <div className='fill-details'>
      <section className='welcome'>
        <h1>
          <span>Welcome</span>
          <br />
          To The Event!
        </h1>
      </section>

      <div className='form-container'>
        <form className='form'>
          <input type='file' id='profilePicture' name='profilePicture' />
          <input type='text' name='firstName' placeholder='First Name' />
          <input type='text' name='lastName' placeholder='Last Name' />
          <select name='portfolioStage'>
            <option value='' disabled selected>
              Portfolio stage
            </option>
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='advanced'>Advanced</option>
            <option value='expert'>Expert</option>
          </select>
          <button
            type='submit'
            id='submitButton'
            onclick="addUser(document.getElementById('name').value, document.getElementById('profilePicture').value, document.getElementById('portfolioStage').value); return false;"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
