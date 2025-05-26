/* eslint-disable @typescript-eslint/no-unused-vars */
export default class OllamaMockService{
    static generate({systemPrompt, model, prompt}:{systemPrompt : string, model : string, prompt : string}){
        console.log('prompt : ', prompt)
        return "Here is some generated text."
    }


}