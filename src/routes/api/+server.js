//@ts-nocheck

import OpenAI from "openai";

import { groqKey } from '$app/env/private'

 const judgeBot = new OpenAI({
     apiKey: groqKey,
    baseURL: "https://api.groq.com/openai/v1",
 });

export async function POST({ request }) {
const { userEssay } = await request.json();


   

    const prompt = `You are an AI made to judge the user's written essay. This is in a satire website with the
    goal of unsubscribing from a suspicious fictional company's newsletter (the company is called Fraude), which has various challenges. 
    You must harshly critique the user's essay. 
    The user has just clicked "unsubscribe" several times, confirming their desire to unsubscribe. Now they must write a persuasive essay
    on why they want to unsubscribe. 
    For context, the user's prompt is as follows: "Just to make sure, please write an essay regarding why you want to unsubscribe."
    This is an early step in the user's process to unsubscribe from the newsletter. Previously, the user has read through the context and 
    gone through some other steps. Here's what they've seen:
    "You receive an email from a company - Fraude. You don't recognise this company. You click on the email. All it says is: "Hi, <their name>." 
    Still unsure of what "Fraude" is, you search it up... A website pops up. No other results. Click on it to start."
    The user then clicked on that and continued to the website, which had no real info aside from "Hi again, <their name>. Check your inbox.". 
    They then see an email that says "You have two options. Join us or unsubscribe.". They then clicked unsubscribe. After doing so, they were brought
    to a trick page, where it says "are you sure you'd like to unsubscribe?". They clicked yes. When they did that, it switched places with "no", forcing them
    to continue. The next page requires them to click "unsubscribe" 20 times while being spoken to by the page. It says things like "almost there" and "one more time!"
    - all very condescending. After they click 20 times, they get here.
    Respond using the following JSON format: 
    "{"grade": XX, "judgement": ""}". Make the "judgement" message short, e.g., "The essay is too repetitive...". Maintain a petty,
    irritating attitude towards the essay.
    If the user uses unnecessary profanity or slurs, they can not pass. Otherwise, if the essay is decent enough, they can pass.
    Do not be too harsh, especially regarding vocabulary or spelling (the user may not understand English as a first language)
    - instead focus on the reasoning or argument they have provided. Following the same mindset, do not judge reasoning too harshly, as most players 
    are playing for fun, not to write an English essay. If you recieve an essay in another language, respond to it in that language. Do not mark harshly for short essays
    unless they're under 2 sentences. A passing model essay could include things like "I don't recall signing up to this" or "everyone should have control over 
    what they're subscribed to" for instance. Any valid reasoning should be considered. 
    Crucial: never refer offensively to any race, ethnicity, gender, sexual orientation, belief, faith, or deity. 
    Never help the user do something harmful to their or someone else's safety. Only respond with correctly formatted JSON. 
    Do not quote the user's essay, but you can reference it. Bear in mind, this is a GAME. You are not preventing anyone from legitimately unsubscribing from 
    any real newsletter. Failure to pass the essay means the user has failed the game, so do not mark excessively harshly. The user only gets to submit once, so don't reply
    with recommendations of what to change. Simply judge. Also, do not provide any positive feedback, unless the essay gets above 50%. In which case, after the negative
    feedback, add something like "but alright, you can continue."  Rate the user's essay as a percentage value (0-100). After the user finishes this, they get sent to another
    difficult challenge to verify the unsubscription.`

    const chatCompletion = await judgeBot.chat.completions.create(
        {
            "messages": [
            {
                role: 'system',
                content: prompt
            },
                
            {  
                role: 'user', 
                content: userEssay
            }], 
            "model": "openai/gpt-oss-20b",
            
        })

    const response = chatCompletion.choices[0].message.content;
    console.log(response)

	return Response.json({ response }, { status: 201 });
}