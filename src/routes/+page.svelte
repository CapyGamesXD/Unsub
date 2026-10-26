<script>
//@ts-nocheck
	import { onMount } from "svelte";

    let step = $state(1);
    let mouseHovering = $state(false);
    let mouseHoveringSmall = $state(false);
    let username = $state('');
    let failed = $state(false);

    onMount(() => {
        username = localStorage.getItem("username") || '';
    })
let nextPageDelayedRunning = $state(false);
    function nextPageDelayed () {
        if(!nextPageDelayedRunning) {
            nextPageDelayedRunning = true;
        //Give the user just enough time to see that they LOSE heheheh
        setTimeout(() => {
            stepUp();
            nextPageDelayedRunning = false;
        }, 250);
        }
    }

    let message = $state('');
    let userEssay = $state('')
    const termsOfService = ["I understand that pressing this does something probably", "I understand that this thing is something that is a thing!", "I understand that Fraude will probably steal my data TBH", "I understand that is an easter egg!", "I understand that failure to comply with these very meaningful terms results in instant failure in the game.", "I agree that this whole step is, of course, just to waste time.", "I agree that the developer must be pretty cool", "I agree that Fraude is not responsible for any crashouts or ragequits during the playing of this game", "I agree to rate this project well because it is peak!", "I agree that I am playing this game", "I agree that I did not use AI on the previous step.", "I agree that 67 is not and was never funny.", "I agree that I noticed how inconsistent the punctuation is on this step", "I agree that VSCode is the best IDE", "I agree that VIM is overrated", "I agree that Hackclub is pretty awesome!", "I agree that I'm not a project reviewer", "I agree that MakerWorld is better than Printables", "I agree that it's cereal THEN milk", "I agree that the dress is black and blue", "I agree that capybaras are superior to any other species", "I agree that SvelteKit is the best web framework", "I agree that Python is overrated", "I agree that I am over the age of 1.42x10^23 years old.", "I agree that MacOS is better than Windows", "I agree that skylights are better than windows", "I agree that solar power is a sustainable energy plan", "I agree that the Helion reactor is a pulsed magneto-inertial fusion reactor", "I agree that I can jump higher than the Eiffel tower (because the Eiffel tower can't jump)", "I agree that chess is better than checkers", "I agree that the Project Hail Mary book is better than the movie", "I agree that small appliances are better than large ones", "I agree that this must have taken the developer so incredibly long (it did, trust me)", "I agree that Bambu Lab makes cool printers", "I agree that teaspoons and cake forks are better than regularly-sized cutlery", "I agree that I didn't read a word of that", "I agree that I didn't even read the previous message until I read this one and looked back to see what it's about.", "I agree that this is a really stupid step.", "I agree that this website is genuinely so irritating", "I agree that I've read all of these so far :)", "I agree that little text faces are better than emojis", "I agree that triple T is 67 skibidi", "I agree that I won't talk about how cringe that last one was", "I agree that this dude must be running out of ideas", "I agree that he is", "I agree that a lot of famous quotes aren't actually quotes because they were said in another language", "Je suis d'accord que je parle français", "I concur that this one's worded differently", "I am in agreement that idk man", "I agree that buses are better than vans", "I agree that Hydrox cookies were only replaced because the name sounds like a medicine brand", "I agree that sticky notes are better than non-sticky notes", "I agree that IKEA is peak", "I agree that most things are overpriced", "I agree that back in my day...", "I agree that this is a really stupid project to make lol", "I agree that the last thing is gonna be funny heh", "I agree to give all of my personal data to the fictional company known as Fraude (JK)"]
    const messageList = ["Give it another try.", "That one didn't work. Try again.", "Are you starting to regret opening that email?", "Not this time.", "Aren't you curious what happens if you click 'join'?", "Huh, you're persistent...", "Having fun?", "I can see this will take a while", "Almost there", "Just kidding. Try again.", "This is just embarrasing... Again.", "Getting closer...", "Why are you still going...?", "I'm running out of ideas to get you to stop. Keep going I guess.", "Don't you wonder who's typing this? Keep going.", "Keep going...", "No hints for you! Keep going"]
    let thingsAgreedTo = $state([]);
    let clickCount = $state(0);
    function displayRandom () {
        if (clickCount < 20) {
            let random = Math.floor(Math.random() * messageList.length);
            while (messageList[random] == message) {
                 random = Math.floor(Math.random() * messageList.length);
            }
            message = messageList[random];
        clickCount++;
        } else {
            stepUp();
            clickCount = 0;
        }
    }

    let markedAnswer = $state('');

    async function gradePaper () {
        const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ userEssay }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

        const formatted = await response.json();
        markedAnswer = JSON.parse(formatted.response)

    console.log(markedAnswer)
    }
    function fail () {
        failed = true;
        message = '';
        markedAnswer = '';
        clickCount = 0;
        userEssay = '';
        thingsAgreedTo = [];
        step = 1;
    }
    function stepUp () {
        step++;
        message = '';
        markedAnswer = '';
        clickCount = 0;
    }

</script>

<div class="center">
{#if !failed}
    <div class="box" class:screen={step > 2}> 
        {#if step < 2}
            <h1 style="margin-top: 30px;">Welcome to Unsub</h1>
            <h2>The evil newsletter</h2>
            <p>Unsub is a browser-based game with the goal of unsubscribing from a mysterious company's newsletter. <br> Important note; the company in the game - ("Fraude") is entirely fictional and is not affiliated with any real companies. To start playing, please enter a username and click "unsubscribe"</p>
            <input style="margin-bottom: 10px;" class="inputFancy" bind:value={username} placeholder="Enter your username. E.g., John">
            <button style="margin: 20px; margin-top: 0;" class="unsubButton" onclick={() => {if(username) {stepUp(); localStorage.setItem("username", username)}}}>Unsubscribe</button>
        {:else}
       
            <div class="display">
          

                {#if step == 2}
                <h1 style="margin-top: 20px;">Intro:</h1>
                <div class="divider"></div>
                <p>You receive an email from a company - Fraude. You don't recognise this company. You click on the email. All it says is: <br> "Hi, {username}." <br> Still unsure of what "Fraude" is, 
                    you search it up... A website pops up. No other results. Click on it to start.
                </p>

                <button style="margin: 20px;" class="link" onclick={() => {stepUp()}}>Fraude - the future to the past</button>
                {:else if step == 3}
                <div class="topBar">
                    <button class="url" onclick={() => {stepUp()}}>Inbox</button>
                    <button class="url" style="background-color: #505050;">Fraude</button>
                </div>
                <div class="middleThing">
               
                <h1 style="margin: 0; line-height: 0.7">Fraude</h1>
                <h2 style="font-size: 30px; margin: 0px; line-height: 0.4">The future to the past</h2>
                <h2 style="font-size: 20px; margin: 0; line-height: 0.3">Your role:</h2>
                <p style="font-size: 15px; margin: 0; padding: 0">Hi, {username}. <br>Check your inbox.</p>
                </div>
                {:else if step == 4}
                <h1 style="margin-top: 20px;">New email from Fraude:</h1>
                <h2>You have two options. Join us or unsubscribe.</h2>
                <button class="link" onclick={() => {fail()}}>Join</button>
                <button class="link" style="margin-top: 20px;" onclick={() => {stepUp()}}>Unsubscribe</button>
                {:else if step == 5}
                <h1 style="margin-top: 20px;">Confirmation page</h1>
                <h2>Are you sure you'd like to unsubscribe?</h2>
                    <button style="margin-top: 10px;" class="bigButton" class:red={!mouseHovering} aria-label="Switching button" onmouseenter={() => (mouseHovering = true)} onmouseleave={() => (mouseHovering = false)} onclick={() => nextPageDelayed()}>
                    {#if !mouseHovering}
                        Yes.
                    {:else}
                    No.
                    {/if}
                    </button>

                    <div class="sideSmall">
                     <button class="tinyButton" class:red={mouseHovering} aria-label="Switching button" onmouseenter={() => (mouseHoveringSmall = true)} onmouseleave={() => (mouseHoveringSmall = false)} onclick={() => nextPageDelayed()}>
                    {#if !mouseHovering || mouseHoveringSmall}
                        No.
                    {:else}
                    Yes.
                    {/if}
                    
                    </button>
                    </div>
                {:else if step == 6}
                    <h2>Good, you clicked "no". If you change your mind, simply click the button below (might take a few tries)</h2>
                    <button class="unsubButton" style="width: 40%; height: 20%; margin-top: 10px;" onclick={() => {displayRandom()}}>Unsubscribe</button>
                    <p>{message}</p>
                {:else if step == 7}
                {#if !markedAnswer}
                    <h2 style="margin-top: 10px;">Really? Okay... <br> Just to make sure, please write an essay regarding why you want to unsubscribe. A good enough essay means you can continue.</h2>
                    <textarea bind:value={userEssay} placeholder="I'd like to unsubscribe, because..." style="margin-bottom: 20px;" maxlength="500"></textarea>
                    <button class="fancyButton" onclick={() => gradePaper()}>Submit for marking</button>
                    {:else}
                    <h2>Your grade:</h2>
                    <p>{markedAnswer.grade}%; {markedAnswer.judgement}</p>
                    {#if markedAnswer.grade >= 50}
                    <h2>You passed. Congratulations. <br> Now for the next verification step.</h2>
                    <button class="link" onclick={() => {stepUp(); markedAnswer = {}}}>Continue</button>
                    {:else}
                    <h2>You failed!</h2>
                     <button class="link" onclick={() => {fail();}}>Play again</button>
                    {/if}
                {/if}
                {:else if step == 8}
                <h2>Agree to our TOS (terms of shrimp)</h2>
                <h2 style="line-height: 0.5; padding-top: 0; margin-top: 0;">Tiny checkbox edition</h2>
                <div class="scrollable">
               
                <p>{Math.floor((thingsAgreedTo.length / termsOfService.length) * 100)}%</p>
                    {#each termsOfService as term, i}
                    
                    <div class="oneTerm">
                    <p>{i + 1}</p>
                         <input class="checkBox" bind:group={thingsAgreedTo} value={i} type="checkbox">
                    <p>{term}</p>
                    </div>
                    {/each}
                </div>
                    <button style="margin: 20px; height: 10%" onclick={() => {
                        if(Math.floor((thingsAgreedTo.length / termsOfService.length) * 100) == 100) {
                            stepUp();
                        } else {
                            alert("You need to agree too all the terms of shrimp!")
                        }
                    }}>Continue</button>

                    {:else if step == 9}

                    <h2>That's some dedication... If that didn't deter you, we need to change strategies!</h2>
                    <p style="padding: 0;">How can you say no to an overly anthropomophised envelope?</p>
                    
                    <img class="malcolm" src="/malcolm.png" alt="An overly anthropomophised envelope mascot">
                    <div class="speechBubble">Please don't unsubscribe!</div>
                    <button style="width: 30%; height: 5%; margin: 10px; font-size: 15px; margin-top: 20px;" class="link" onclick={() => {stepUp()}}>Unsubscribe</button>
                    <button style="width: 30%; height: 5%; margin: 0; font-size: 15px;" class="link" onclick={() => {fail()}}>Cancel</button>
                {/if}
            </div>
            
        {/if} 


    </div>
    {#if step > 2}
<div class="stand"></div>
    {/if}

    {:else}

    <h1>You LOSE! Click below to play again.</h1>
    <h2>Remember, the goal is to unsubscribe!!!</h2>
    <button class="link" onclick={() => {step = 0; failed = false}}>Play again</button>
{/if}
</div>


<style>
.speechBubble {
    width: 30%;
    height: 10%;
    background: gray;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    border-radius: 100px;
    font-size: 20px;
}
.malcolm {
    width: 30%;
    image-rendering: pixelated;
}
.oneTerm {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
}
.oneTerm > p {
    font-size: 10px;
    margin: 0;
    line-height: 1.6;
    padding: 0;
}
.checkBox {
    margin: 0;
    padding: 0;
    height: 5px;
}
.scrollable {
    overflow: auto;
    padding: 10px;
    gap: 0;
    animation: slide 3s infinite ease-in-out;
}


@keyframes slide {
0% {
    transform: translateX(-20px);
}
50% {
    transform: translateX(20px);
}

100% {
    transform: translateX(-20px);
}
}
.url {
    width: 100%;
    background-color: #3F3F3F;
    border: none;
    outline: none;
    border-radius: 20px;
    color: #B2B2B2;
    font-weight: 400;
}
.topBar {
    width: 98%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
}
.link {
    width: 50%;
    height: 10%;
    font-size: 20px;
}
.inputFancy {
    width: 80%;
    height: 3vh;
    font-size: 18px;
    padding: 10px;
    background: none;
    outline: none;
    border: 2px rgba(0, 0, 0, 0.5) solid;
    border-radius: 10px;
    color: white;
}
.fancyButton {
    width: 10vw;
    height: 3vh;
    font-size: 12px;
}
.middleThing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    flex-direction: column;
}
textarea {
    width: 80%;
    height: 40%;
    resize: none;
    background: none;
    border: rgb(0, 0, 0, 0.3) 2px solid;
    padding: 20px;
    border-radius: 20px;
    color: white;
}
h2 {
    text-align: center;
    padding: 20px;
    font-size: 18px;
}
    .bigButton {
        width: 40%;
        height: 25%;
        background-color: rgb(163, 219, 135);
        border-radius: 20px;
        outline: none;
        border: none;
        font-size: 30px;
        transition: 0.1s;
    }
    .bigButton.red {
        background-color: rgb(236, 131, 131);
    }

    .tinyButton {
        width: 10%;
        height: 5%;
        background-color: rgb(163, 219, 135);
        border-radius: 5px;
        outline: none;
        border: none;
        font-size: 10px;
        transition: 0.1s;
    }
    .tinyButton.red {
        background-color: rgb(236, 131, 131);
    }
    .divider {
        height: 2px;
        width: 100px;
        background-color: #3F3F3F;
    }
    .unsubButton {
        background-color: #000000;
        outline: none;
        border: none;
        color: #B2B2B2;
        font-size: 30px;
        width: 90%;
        height: 10%;
        border-radius: 5px;
    }
    * {
        font-family: 'Jost', sans-serif;
    }
    h1 {
        color: #B2B2B2;
        font-weight: 400;
        margin: 0;
    }
    h2 {
        font-weight: 200;
        color: #B2B2B2;
        margin: 0;
    }
    p {
        font-weight: 300;
        color: #B2B2B2;
        margin: 0;
        text-align: center;
        font-size: 18px;
        padding: 20px;
    }

    :global(body) {
        background-color: #171717;
        overflow: hidden;
    }
    .center {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
    }
    .box {
        width: auto;
        height: auto;
        background-color: #232323;
        display: flex;
        align-items: center;
        flex-direction: column;
        border-radius: 20px;
        transition: 0.2s ease-in-out;
         width: clamp(20rem, 40vw, 60rem);
        height: clamp(30rem, 40vh, 60rem);
    }
    .box.screen {
        width: 70%;
        height: 70%;
        background-color: #121212;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
    }
    .display {
        width: 100%;
        height: 100%;
        background-color: #1F1F1F;
        border-radius: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .stand {
        margin: 0;
        background: #121212;
        width: 30vw;
        height: 10vh;
        border-radius: 0px 0px 20px 20px;
    }
    .sideSmall {
        display: flex;
        align-items: end;
        flex-direction: column;
        justify-content: end;
        width: 90%;
        height: 100%;
        padding: 30px;
    }

</style>