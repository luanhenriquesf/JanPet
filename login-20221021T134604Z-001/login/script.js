/*criando uma fuçao chamada init, que vai ser chamada quando o window carregar, peguei a variavel pelo type! , + fazendo variaveis de email e de senha, de maneira regex sao padroes para "filtrar" determinado texto em uma cadeia de caracteres. sejam eles valores de inputs ou qualquer outro texto. nao se assuste  e uma regex de validaçao de email */
const init = () => {
    const validateEmail = (event) => {
        const input = event.currentTarget;
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailTest = regex.test(input.value);

        
        if(!emailTest) {
            submitButton.setAttribute("disabled", "disabled");
            input.nextElementSibling.classList.add('error');
        } else {
            submitButton.removeAttribute("disabled");
            input.nextElementSibling.classList.remove('error');
        }
    }

    const validatePassowrd = (event) => {
        const input = event.currentTarget;

        if(input.value.length < 8) {
            submitButton.setAttribute("disabled", "disabled");
            input.nextElementSibling.classList.add('error');
        } else {
            submitButton.removeAttribute("disabled");
            input.nextElementSibling.classList.remove('error');
        }
    }
    /*botoes de erro ou correto */
    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('.login__submit');

    inputEmail.addEventListener('input', validateEmail);
    inputPassword.addEventListener('input', validatePassowrd);

    const errorHandler = () => {
        submitButton.classList.remove('loading');
        submitButton.classList.remove('success');
        submitButton.classList.add('error');
        submitButton.textContent = "Error :(";
    }

    const successHandler = () => {
        submitButton.classList.remove('loading');
        submitButton.classList.remove('error');
        submitButton.classList.add('success');
        submitButton.textContent = "Sent! :)";
    }

    /*criando validaçao para saber se o submit button existe,+ adicionando evento 'click' para previnir de qualquer default, abrir as chaves para mostrar o metodo=>"POST", headers: tipo de arquivo que estamos enviando para o end point. */
    if(submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            submitButton.textContent = "Loading...";

            /*fath,+ url da requesisao, */ 
            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                /*valor dos inputs,"stringify- para que seja legivel" */
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
                /*criando then */
            }).then((response) => {
                if (response.status !== 200) {
                    return errorHandler();
                }
                
                successHandler();
                
            }).catch(() => {
                errorHandler();
            })
        })
    }
}

/*window carregando a init*/
window.onload = init;