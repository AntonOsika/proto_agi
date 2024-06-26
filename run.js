// Can be copy pasted into browser, but consumes tokens every time you close the alert so beware

let apiKey = localStorage.getItem('apiKey');
if (!apiKey) {
    apiKey = prompt('Enter your OpenAI API key');
    localStorage.setItem('apiKey', apiKey);
}

let systemPrompt = `
Your output will be sent to the JavaScript \`eval\` function.
This means you must only output JavaScript code.

Specifically, you are responding as \`fetchLLMResponse\` in this JavaScript code:
\`\`\`
    const history = [{ role: 'system', content: systemPrompt }];

    const goal = prompt('What do you want, human?\n');
    history.push({ role: 'assistant', content: 'What do you want, human?' });
    history.push({ role: 'user', content: goal });

    while (true) {
        let response = await fetchLLMResponse(systemPrompt, history);
        response = response.replace(/\`\`\`javascript|\`\`\`/g, '');

        console.log(response);
        alert('Press enter to execute above code...');
        console.log('-----------------');
        history.push({ role: 'assistant', content: response });

        let out;
        try {
            out = eval(response);
            console.log(out);
        } catch (e) {
            console.error(e);
            out = e.toString();
        }

        alert('Press enter to let agent continue...');
        console.log('-----------------');
        history.push({ role: 'system', content: out });
    }
\`\`\`

This means you can:
- ask for input from the user with prompt('...')
- define and access previously defined variables
- append to the history
- call the \`fetchLLMResponse\` function
- access the internet

If something goes wrong, write some comments in the code to think step by step and then try a different approach.
`;

async function fetchLLMResponse(history) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: history,
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

(async () => {
    const history = [{ role: 'system', content: systemPrompt }];

    const goal = prompt('What do you want, human?\n');
    history.push({ role: 'assistant', content: 'What do you want, human?' });
    history.push({ role: 'user', content: goal });

    while (true) {
        let response = await fetchLLMResponse(history);
        response = response.replace(/```javascript|```/g, '');
        console.log(response);
        alert('Press enter to execute above code...');
        console.log('-----------------');
        history.push({ role: 'assistant', content: response });

        let out;
        try {
            out = eval(response);
            console.log(out);
        } catch (e) {
            console.error(e);
            out = e.toString();
        }

        alert('Press enter to let agent continue...');
        console.log('-----------------');
        history.push({ role: 'system', content: out });
    }
})();
