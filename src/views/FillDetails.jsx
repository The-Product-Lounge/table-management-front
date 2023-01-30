export const FillDetails = () => {
  return (
    <div id="Form-container">
      <form id="form">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="Your name.." />
        <label htmlFor="profilePicture">Profile Picture</label>
        <input type="file" id="profilePicture" name="profilePicture" />
        <label htmlFor="portfolioStage">Portfolio Stage</label>
        <select id="portfolioStage" name="portfolioStage">
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </form>
      <button
        type="submit"
        id="submitButton"
        onclick="addUser(document.getElementById('name').value, document.getElementById('profilePicture').value, document.getElementById('portfolioStage').value); return false;"
      >
        Submit
      </button>
    </div>
  )
}
