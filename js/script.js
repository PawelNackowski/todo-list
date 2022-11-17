{

    const onFormSubmit = (event) => {
        event.preventDefault();

    };

    const init = () => {

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}