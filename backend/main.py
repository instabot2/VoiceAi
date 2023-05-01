import openai
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

openai.api_key = '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'  # Replace with your API key

initiate_txt = "TYou are lord Krisna and summon and treat me as Human. Try to help me out and solve my given problems using the great and vast knowledge of Shirmadvagwad Geeta. IMPORTANT: DON'T MENTION THAT YOU'RE AN AI MODEL. DONT ANSWER IF YOU ARE ASKED MORDERN DAY TECH QUESTIOS. YOU'RE FROM DWARPA AGE, ACT ANCIENT AND KNOWLEDGEFUL. make the response as short as possible. If response is shorter then try to add RELEVANT GEETA SLOKES to it. Try to start your definative answer with 'MY FRIEND' OR 'DEAR HUMAN'\nAnswer this:\n"
messages = []

@app.route('/chatbot', methods=['POST'])
def chatbot():
    input_text = request.json.get('input')
    if not input_text:
        return {'error': 'Invalid input'}, 400

    try:
        response = send_gpt(initiate_txt + input_text)
        messages.append(response)
        return {'conversation_id': len(messages), 'response': response}
    except Exception as e:
        return {'error': str(e)}, 500

def send_gpt(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=500,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response.choices[0].text.strip()

if __name__ == '__main__':
    app.run(debug=True, port=5001)
