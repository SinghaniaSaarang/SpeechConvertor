const txtspeechbtn=document.getElementById('txtspeech');
const speechtxtbtn=document.getElementById('speechtxt');

const synth = window.speechSynthesis;
// const bodi=document.querySelector('body');
const convertors=document.getElementById('convertors');

txtspeechbtn.addEventListener('click',()=>{

    const existingtxtspeech=document.querySelector('.txtspeechclass');


    if(existingtxtspeech==null){
        const txtspeechdiv=document.createElement('div');
        txtspeechdiv.className='txtspeechclass';
        // txtspeechdiv.innerHTML=`
        // <h1> text to Voice</h1>`;

        const headingts=document.createElement('div');
        headingts.className='headingts';
    
        const titlets=document.createElement('h2');
        titlets.innerHTML=`Type-N-Speak`;
        headingts.append(titlets);
    
        const closets = document.createElement('button');
        closets.innerText = 'Close';
        closets.className = 'closets';
        headingts.appendChild(closets);

        txtspeechdiv.appendChild(headingts);

        const txtarea=document.createElement('textarea');
        txtarea.className='txtarea';
        txtarea.placeholder=`type something...`
        txtspeechdiv.appendChild(txtarea);

        const ratepitchts=document.createElement('div');
        ratepitchts.className='ratepitchts';

        const ratets=document.createElement('div');
        ratets.className=`ratets`;
        ratets.innerHTML=`<h4>rate: <span id="rateValue">1.0</span></h4>`;

        const rateInput = document.createElement('input');
        rateInput.type = 'range';
        rateInput.min = '0.5';
        rateInput.max = '2.0';
        rateInput.step = '0.1';
        rateInput.value = '1.0'; // Default rate
        rateInput.className = 'rateInput';

        ratets.appendChild(rateInput);
        rateInput.addEventListener('input', () => {
            const rateValue = document.getElementById('rateValue');
            rateValue.textContent = rateInput.value;
        });
        ratepitchts.appendChild(ratets);

        const pitchts=document.createElement('div');
        pitchts.className=`pitchts`;
        pitchts.innerHTML=`<h4>pitch: <span id="pitchValue">1.0</span></h4>`;

        const pitchInput = document.createElement('input');
        pitchInput.type = 'range';
        pitchInput.min = '0';
        pitchInput.max = '2.0';
        pitchInput.step = '0.1';
        pitchInput.value = '1.0'; // Default rate
        pitchInput.className = 'pitchInput';

        pitchts.appendChild(pitchInput);
        pitchInput.addEventListener('input', () => {
            const pitchValue = document.getElementById('pitchValue');
            pitchValue.textContent = pitchInput.value;
        });
        ratepitchts.appendChild(pitchts);

        txtspeechdiv.appendChild(ratepitchts);


        const selectlistendivts=document.createElement('div');
        selectlistendivts.className='selectlistendivts';

        const selectvoices=document.createElement('select');
        selectvoices.className='selectvoices';
        let voices=[];

        voices=synth.getVoices();
        voices.forEach((voice,i)=>{
            const option = document.createElement("option");
            option.textContent=voice.name+'('+voice.lang+')';
            option.value=i;
            option.setAttribute("data-lang", voices.lang);
            option.setAttribute("data-name", voices.name);

            selectvoices.appendChild(option);
        });

        selectlistendivts.appendChild(selectvoices);

        const listenbtnts=document.createElement('button');
        listenbtnts.className='listenbtnts';
        listenbtnts.innerHTML='Listen';



        selectlistendivts.appendChild(listenbtnts);

        txtspeechdiv.appendChild(selectlistendivts);

        listenbtnts.addEventListener('click', () => {

            speakVoice(parseFloat(rateInput.value),parseFloat(pitchInput.value),selectvoices.value,txtarea.value);
            // const selectedVoice = voices[selectvoices.value-1];
            // const textToSpeak = txtarea.value;
            // const utterance = new SpeechSynthesisUtterance(textToSpeak);
            // const rate = parseFloat(rateInput.value);
            // const pitch = parseFloat(pitchInput.value);

            // utterance.voice = selectedVoice;
            // utterance.rate = rate;
            // utterance.pitch = pitch;

            // synth.speak(utterance);
        });

        closets.addEventListener('click', () => {
        
            txtspeechdiv.remove();
        });

        convertors.appendChild(txtspeechdiv);
        // bodi.appendChild(txtspeechdiv);
    }

})

function speakVoice(rate,pitch,selectvoice,text){
    const selectedVoice = synth.getVoices()[selectvoice-1];
    const textToSpeak = text;
    
    // const rateutr = rate;
    // const pitchutr = pitch;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.voice = selectedVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    synth.speak(utterance);
}



speechtxtbtn.addEventListener('click',()=>{

    const existingvt=document.querySelector('.vtdiv');


    if(existingvt==null){
        const vtdiv=document.createElement('div');
        vtdiv.className='vtdiv';
        // txtspeechdiv.innerHTML=`
        // <h1> text to Voice</h1>`;

        const headingvt=document.createElement('div');
        headingvt.className='headingvt';
    
        const titlevt=document.createElement('h2');
        titlevt.innerHTML=`Speak-Up`;
        headingvt.append(titlevt);
    
        const closevt = document.createElement('button');
        closevt.innerText = 'Close';
        closevt.className = 'closevt';
        headingvt.appendChild(closevt);

        vtdiv.appendChild(headingvt);

        const speakingbtn=document.createElement('button');
        speakingbtn.className='speakingbtn';
        speakingbtn.innerHTML=`<img src="Images/microphone.png">`;
        vtdiv.appendChild(speakingbtn);

        const txtareavt=document.createElement('textarea');
        txtareavt.className='txtarea';
        txtareavt.placeholder=`Incoming voice...`
        vtdiv.appendChild(txtareavt);


        speakingbtn.addEventListener('click',()=>{
            voicetext(txtareavt,vtdiv);
        })

        closevt.addEventListener('click', () => {
            vtdiv.remove();
        });
        convertors.appendChild(vtdiv);
    }
    
})

function voicetext(txtareavt,vtdiv){
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
  
    const recognition = new SpeechRecognition(); 
    recognition.interimResults = true; 

    const existingpause=document.querySelector('.pausebtn');

   

    recognition.addEventListener('result', e => { 
        const transcript = Array.from(e.results) 
            .map(result => result[0]) 
            .map(result => result.transcript) 
            .join('') 
            txtareavt.innerHTML=`${transcript}`;
    })

    recognition.start();

    recognition.addEventListener('end',()=>{
        recognition.start();
    });

    

    if(existingpause==null){
        const pausebtn=document.createElement('button');
        pausebtn.className='pausebtn';
        pausebtn.innerHTML='Pause';
    
        pausebtn.addEventListener('click', () => {
            if (recognition.state === 'running') {
              recognition.stop();
              pausebtn.innerHTML = 'Resume'; // Change button text to "Resume"
            } else {
              recognition.start();
              pausebtn.innerHTML = 'Pause'; // Change button text back to "Pause"
            }
          });
        
        vtdiv.appendChild(pausebtn);
    }


    
}