const images = [
    'https://images.unsplash.com/photo-1641874536900-4a2fdc230f32?q=80&w=1198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1575403404375-e48e09676c3c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1566930450642-c639e92b9433?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

let currentIndex = 0;

    // Function to change the background image
    function changeBackground() {
      const heroElement = document.querySelector('.hero');

      // Fade out first
      heroElement.style.opacity = 0;

      // Wait for the fade-out to complete before changing the background
      setTimeout(() => {
        heroElement.style.backgroundImage = `url('${images[currentIndex]}')`;

        // Fade back in
        heroElement.style.opacity = 1;

        // Update index for next image
        currentIndex = (currentIndex + 1) % images.length;
      }, 1000); // Match the timeout to the fade-out duration (1s)
    }

    // Call changeBackground every 2 seconds
    setInterval(changeBackground, 2000);