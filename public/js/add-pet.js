const addPet = async (event) => {
    event.preventDefault();

    const pet_name = document.querySelector('#PetName').value.trim();
    const breed = document.querySelector('#PetBreed').value.trim();
    const age = document.querySelector('#PetAge').value.trim();

    if (pet_name && breed && age) {
        const response = await fetch(`/api/pets`, {
            method: 'POST',
            body: JSON.stringify({ pet_name, breed, age }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create project');
        }
    }
};


document
    .querySelector('#addPet')
    .addEventListener('submit', addPet);