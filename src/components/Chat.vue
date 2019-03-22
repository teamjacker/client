<template>
  <div class="online">
    <h4 class="fontcolor">Who's Online</h4>
    <hr>
    <div class="chat ">
      <div v-for="chat in texts" v-bind:key="chat.id" class="chats" autocomplete="off">
        <p class="text">{{chat.username}}: {{chat.text}}</p>
      </div>
    </div>
    <div>
      <form v-on:submit.prevent="sendMessage" class>
        <input
          v-model="text"
          type="text"
          name="text"
          id="text"
          class="form-control"
          placeholder="Send a message"
        >
        <button type="submit">SEND</button>
      </form>
    </div>
  </div>
</template>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.send {
  width: 340px;
  border: 1px solid black;
  height: 30px;
  position: absolute;
  top: 560px;
  right: 0px;
}

.play {
  font-weight: bold;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 20px;
  border: 1px solid black;
  height: 100px;
  margin-bottom: 50px;
  /* background-color: whitesmoke; */
}

.play:hover,
.rules:hover {
  background-color: #0f042f;
  text-decoration: none;
}

.play:active,
.rules:active {
  text-decoration: none;
  background-color: white;
}

.rules {
  text-decoration: none;
  font-weight: bold;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 20px;
  border: 1px solid black;
  height: 100px;
}

.fontcolor {
  color: white;
  font-weight: bold;
}

.online {
  /* border: 1px solid black; */
  align-items: center;
  border-radius: 2px;
  width: 400px;
  position: relative;
  /* left: 840px; */
  top: -250px;
  right:-100px;
  float: right;
  background-color: #0f042f;
}

.chat {
  /* border: 1px solid black; */
  overflow-y: scroll;
  border-radius: 2px;
  height: 500px;
  margin: 20px;
  background-color: #d0daeb;
  position: relative;
}

.text {
  text-align: left;
  font-weight: bold;
}
</style>


<script>
import db from "@/api/firebase.js";

export default {
  name: "Chat",
  data() {
    return {
      text: "",
      texts: []
    };
  },
  methods: {
    sendMessage() {
      // console.log(this.text)
      this.username = localStorage.user;
      console.log(this.username);
      db.collection("Messages")
        .add({
          username: this.username,
          text: this.text,
          createdAt: new Date()
        })
        .then(docRef => {
          // console.log(docRef)
          // console.log(docRef.text)
          // console.log(docRef.id)
          this.text = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    db.collection("Messages")
      .orderBy("createdAt")
      .onSnapshot(docs => {
        this.texts = [];
        // console.log(docs, 'onSnapshot')
        docs.forEach(doc => {
          this.texts.push(doc.data());
        });
        // console.log(this.texts)
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
