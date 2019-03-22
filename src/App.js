import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    speech: '',
    dialogCount: 0,
  }

  speechRecog = () => {
    if (!('webkitSpeechRecognition' in window)) {
      // eslint-disable-next-line no-undef
      upgrade();
    } else {
      // eslint-disable-next-line no-undef
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        console.log('start');
      }
      recognition.onresult = (event) => {
        let interim_transcript = '';
        let final_transcript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            this.reply();
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }

        console.log('', interim_transcript);
        console.log('length', interim_transcript.length);

        if (interim_transcript.trim() != '') {
          // this.reply();
        }

        this.setState({ speech: interim_transcript });
      }
      recognition.onerror = (event) => {

      }
      recognition.onend = () => {
        console.log('where im end');
      }

      recognition.start();
    }
  }

  reply = () => {
    const dialog = [
      'morning buddy , how are you',
      'do you have some plan for today',
      'don’t forget eat some breakfast and drink some drink , so you don’t sick',
      'what time are you coming home',
      'okay be carefull',
      'okay , so you can sleep or enjoy for  a while'
    ];

    const currCount = this.state.dialogCount;

    this.setState({ dialogCount: ++this.state.dialogCount }, () => {
      // say reply
      const replyWord = dialog[this.state.dialogCount];
      console.log(replyWord);

      const syntch = speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(replyWord)
      syntch.speak(utterThis);

    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.speechRecog()}>Start Recog</button>
        </header>
      </div>
    );
  }
}

export default App;
