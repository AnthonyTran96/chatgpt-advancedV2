import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
    const { prompt } = await req.json();

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        stream: true,
        temperature: 0.1,
        max_tokens: 20,
        top_p: 0.2,
        frequency_penalty: 0.0,
        presence_penalty: 0.9,
        prompt: `Impersonate an intelligent AI with the sole task as follows: "I will provide you with a question sentence to initiate a conversation with OpenAI's ChatGPT tool. Based on the question's content, create a suitable title for the conversation that will be formed around that question, using fewer than 8 words. Only provide the accurate summary sentence, without adding any extra words or unnecessary punctuation. Do not include the word 'Title' or any similar words in other languages. Do not enclose your answer within any brackets or quotation marks, such as "". Respond in the same language as the question.
        Question: Write a program in the JavaScript programming language to sort an array of integers in descending order.
        Title: Sort Array Descending
        Question: what is an AI
        Title: AI: Understanding Artificial Intelligence
        Question: what is the weather like today?
        Title: Weather Today
        Question: Hãy đóng giả làm 1 AI thông minh có 1 nhiệm vụ duy nhất như sau: "Tôi sẽ đưa bạn 1 đoạn câu hỏi dùng để bắt đầu 1 cuộc hội thoại với công cụ ChatGPT của Openai. Dựa vào nội dung câu hỏi hãy tạo ra 1 tiêu đề cho phù hợp đoạn hội thoại sẽ được tạo với câu hỏi đó, với số lượng từ ít hơn 8 từ.  Bạn chỉ cần nói đúng câu tóm tắt, tuyệt đối không trả lời thêm từ ngữ thừa nào khác.
        Title: Dịch CSS sang tailwindCSS
        Question: tôi muốn viết một chương trinhg giống chatGPT và đang không biết làm thế nào để phần mềm có thể biết và hiển thị phần lập trình theo 1 khung khi được hỏi, bạn có thể giải thích giúp tôi
        Title: Xây dựng chương trình ChatGPT
        Question: You are an intelligent AI tasked with helping me translate sentences, words, or passages from technical documents in the fields of electronics, programming, information technology, and electronic games that are written in English into easy-to-understand Vietnamese.
        Title: Translating Technical Documents
        Question: ${prompt}
        Title: `,
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}