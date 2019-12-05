//AXIOS GLOBALS It gets sent with every request you make
axios.defaults.headers.common["X-Auth-Token"] =
  "aksjdjasbfkjaboeooimn,anmvnxcvbsuudbvxmcvoieabmasdn,masd_cnmalaksnsek5hiusdhf84hkuhgshi8rhiv84vhntei";

// GET REQUEST
function getTodos() {
  //   axios({
  //     method: "get",
  //     url: "http://jsonplaceholder.typicode.com/todos",
  //     params: "_limit:5"
  //   })
  axios
    .get("http://jsonplaceholder.typicode.com/todos?_limit=5", {
      timeout: 5000
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// POST REQUEST
function addTodo() {
  axios
    .post("http://jsonplaceholder.typicode.com/todos", {
      userId: 300,
      id: 300,
      title: "New post",
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios
    .patch("http://jsonplaceholder.typicode.com/todos/1", {
      title: "Updated todo",
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("http://jsonplaceholder.typicode.com/todos/1")
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get("http://jsonplaceholder.typicode.com/todos?_limit=10"),
      axios.get("http://jsonplaceholder.typicode.com/posts?_limit=5")
    ])

    .then(axios.spread((todos, posts) => showOutput(todos))) //Naming conventions usong axios.spread(())
    .catch(err => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      "Content-type": "applicatio/json",
      Authorization: "sometokem"
    }
  };

  axios
    .post(
      "http://jsonplaceholder.typicode.com/todos",
      {
        userId: 300,
        id: 300,
        title: "New post",
        completed: false
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "http://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello world !"
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title =
        data.title.toUpperCase() +
        " Whats up boys Im an addition to the text sent and hello world is in all caps now!";
      return data;
    })
  };
  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get(
      "http://jsonplaceholder.typicode.com/todoss?_limit=5"
      // , {
      //   validateStatus: function(stsuts) {
      //     return status < 500;
      //     //Reject request only if status code is higher or equal to 500
      //   }
      // }
    )
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        //If server responded with a status code other than in the 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          alert("Error: Page not found! Please try with a valid page.");
        } else if (err.request) {
          //Request was made but no response was received from the server
          console.error(err.request);
        } else {
          consle.error(err.message);
        }
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getHours() + ":" + new Date().getMinutes()}`
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: "http://jsonplaceholder.typicode.com"
});

// axiosInstance.get("/comments").then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
