import { useState } from 'react';
import Footer from '@/components/Footer';
import CheckListHeader from '@/components/CheckListHeader';
import styles from '../styles/CheckListTable.module.css';

const Checklist = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(0);

  const statements = [
    'I want cheese cake',
    'pass the remote',
    'Its lunch time',
    // Add  predefined statements 
  ];

  const startRecording = () => {
    setIsRecording(true);
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
  };

  const handleSpeechRecognition = (e) => {
    const lastResultIndex = e.results.length - 1;
    const lastTranscript = e.results[lastResultIndex][0].transcript;
    setTranscript((prevTranscript) => prevTranscript + lastTranscript + ' ');

    const currentScore = calculateScore(lastTranscript);
    setScore(currentScore);
  };

  const calculateScore = (transcript) => {
    let highestScore = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].toLowerCase();
      const transcriptLower = transcript.toLowerCase();

      if (transcriptLower.includes(statement)) {
        const wordsInStatement = statement.split(' ');
        const wordsInTranscript = transcriptLower.split(' ');
        const matchedWordsCount = wordsInStatement.filter((word) => wordsInTranscript.includes(word)).length;
        const score = (matchedWordsCount / wordsInStatement.length) * 10;

        if (score === 10) return 10; // If all words are matched, return maximum score

        if (score > highestScore) {
          highestScore = score;
        }
      }
    }

    return highestScore;
  };

  const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.onresult = handleSpeechRecognition;
  }

  return (
    <>
      <div>
        <CheckListHeader />
        <div className={styles.open_section}>
          <h1 className={styles.headline}>
            <mark className={styles.mark}>COMPLIANCE CHECK LIST</mark>
          </h1>
        </div>

        <div className={styles.table_section}>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th className="">ALERT LEVEL</th>
                  <th className={styles.row_name}>ATTEMPT RATING</th>
                  <th className={styles.row_job}>COMPLIANCE STATEMENT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.alert_red}>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>
              </tbody>
            </table>
          <div className={styles.buttons}>
          <button onClick={startRecording} disabled={isRecording}>
            Start
          </button>
          <button onClick={stopRecording} disabled={!isRecording}>
            Stop
          </button>
        </div>
          </div>
        {/* SECOND TABLE */}
        <div className={styles.open_section}>
          <h1 className={styles.headline}>
            <mark className={styles.mark}>FUNERAL CHECK LIST</mark>
          </h1>
        </div>

        <div className={styles.table_section}>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th className="">ALERT LEVEL</th>
                  <th className={styles.row_name}>ATTEMPT RATING</th>
                  <th className={styles.row_job}>COMPLIANCE STATEMENT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alert level value</td>
                  <td>Score</td>
                  <td>Transcript</td>
                  {/* <td>{score}</td>
                  <td>{transcript}</td> */}
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>

                <tr>
                  <td>Alert level value</td>
                  <td>{score}</td>
                  <td>{transcript}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>



      </div>
    </>
  );
};

export default Checklist;
