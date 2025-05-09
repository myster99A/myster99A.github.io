var usernameSaved = ""
var passwordSaved = ""
function insertOnes(password) {
    return password.split('').join('1');
}
function login() {
    const username = insertOnes(document.getElementById("text").value);
    const password = insertOnes(document.getElementById("password").value);
    usernameSaved = username
    passwordSaved = password
    console.log(usernameSaved, passwordSaved)
    const url = `https://app.mysterycabal.org//post-gamble?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    const container = document.getElementById("canvas-container");

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                container.classList.remove("canvas-normal");
                container.classList.remove("canvas-success");
                container.classList.add("canvas-error");
                document.querySelector('.wrongpass').style.display = 'block';
                // alert("Login failed: " + data.error);

            } else {
                container.classList.remove("canvas-normal");
                container.classList.remove("canvas-error");
                container.classList.add("canvas-success");
                document.querySelector('.login-box').style.display = 'none';
                document.querySelector('.contract-box').style.display = 'block';
                // optionally redirect or use contract info here
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong!");
        });
}


function call() {
    const contractAddress = document.getElementById("contractaddress").value;
    const url = `https://app.mysterycabal.org//post-gamble?username=${encodeURIComponent(usernameSaved)}&password=${encodeURIComponent(passwordSaved)}&param=${encodeURIComponent(contractAddress)}`;

    const container = document.getElementById("canvas-container");

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log("success called");
                alert("Could not find a valid token ...");
            } else {
                alert("Success call check https://t.me/mysterycabalcalls ...");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong!");
        });
}