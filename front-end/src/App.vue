<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Nanum Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header,
main,
footer {
  border: 1px solid grey;
}
.common-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

main {
  flex: 5;
}

footer {
  flex: 1;
}

header .header h1 {
  font-weight: bold;
}

main {
  display: flex;
  justify-content: center;
}

.page-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.go-to-welcome-container {
  display: inline-block;
  margin-left: 50px;
  margin-bottom: 30px;
}
.arrow-back-icon,
.go-to-welcome-text {
  display: inline-block;
  color: black;
  font-weight: bold;
}
.arrow-back-icon {
  position: relative;
  top: 5px;
}
.go-to-welcome-text {
  font-size: 1.2rem;
}

footer .footer div {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
