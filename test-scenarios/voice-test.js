var voices = window.speechSynthesis.getVoices();
var msg = new SpeechSynthesisUtterance();
msg.voice = voices[1];
msg.lang = 'cs-CZ';

const messages = [
  "Jděte rovně přibližně 37 metrů",
  "Otočte se doleva",
  "Jděte rovně přibližně 37 metrů",
  "Vyjděte po schodech do patra číslo 1",
  "Otočte se doprava",
  "Jděte rovně přibližně 21 metrů",
  "Dorazili jste do cíle!",
];

msg.text = messages[0];
window.speechSynthesis.speak(msg);

msg.text = messages[1];
window.speechSynthesis.speak(msg);

msg.text = messages[2];
window.speechSynthesis.speak(msg);

msg.text = messages[3];
window.speechSynthesis.speak(msg);

msg.text = messages[4];
window.speechSynthesis.speak(msg);

msg.text = messages[5];
window.speechSynthesis.speak(msg);

msg.text = messages[6];
window.speechSynthesis.speak(msg);
