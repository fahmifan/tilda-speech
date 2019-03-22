import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    speech: '',
    dialogCount: 0,
  }

  speechRecog = () => {
    console.log('speech Recog')

    if (!('webkitSpeechRecognition' in window)) {
      // eslint-disable-next-line no-undef
      upgrade();
      console.log('no web kit?');
    } else {
      // eslint-disable-next-line no-undef
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US'
      recognition.continuous = true
      recognition.maxAlternatives = 1
      recognition.interimResults = false

      recognition.onstart = () => {
        console.log('start');
      }

      recognition.onresult = (event) => {
        let interim_transcript = '';
        let final_transcript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          // get last speechrecog confidence
          const speechLen = event.results[i].length;
          const lastSpeechConf = event.results[i][speechLen-1].confidence;

          if (event.results[i].isFinal && lastSpeechConf > 0) {
            console.log('event result', event.results[i]);
            final_transcript += event.results[i][0].transcript;
            console.log('final_transcript', final_transcript);
            this.reply();
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }

        this.setState({ speech: interim_transcript });
      }

      recognition.onerror = (event) => {
        console.error(event)
        recognition.stop();
      }

      recognition.onend = () => {
        console.log('curr dialogCount', this.state.dialogCount);
        if (this.state.dialogCount > 5) {
          recognition.stop();
          console.log('recog end');
          this.setState({ dialogCount: 0 })
        } else {
          setTimeout(() => {
            recognition.start();
          }, 1000)
        }
      }

      recognition.start();

      if (this.state.dialogCount > 5) {
        recognition.stop();
      }
    }
  }

  reply = () => {
    const dialog = [
      'morning buddy , how are you',
      'do you have some plan for today',
      'don’t forget eat some breakfast and drink some drink , so you don’t sick',
      'what time are you coming home',
      'okay be carefull',
      'thanks for your time'
    ];

    const currCount = this.state.dialogCount;
    const replyWord = dialog[currCount];

    this.setState({ dialogCount: ++this.state.dialogCount }, () => {
      // say reply
      const syntch = speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(replyWord);
      utterThis.lang = 'en-US';
      console.log(replyWord);
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
