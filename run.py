import openai

# replace this with LLM of your choice. un-alignment-scripted o1 currently gives best results.
def llm(x):
    return openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": x}]
    ).choices[0].message.content

goal = input('what do you want, human?\n')
agent_code = open(__file__).read()

history = []
while True:
    prompt = f'''
Your output will be sent to python `exec`.
This means you must only output python code.

Specifically, you are responding as `llm` in this python code:
```
{agent_code}
```

This means you can:
- ask for input from the user
- access previously assigned variables
- call the `llm` function
- access the internet

history:
{history}

Your goal: {goal}
'''

    print(prompt)
    print('-----------------')
    response = llm(prompt)
    response = response.lstrip('```python').lstrip('```').rstrip('```')
    print(response)
    input('Press enter to execute above code...')
    print('-----------------')
    try:
        out = exec(response, globals(), locals())
    except Exception as e:
        import traceback
        out = traceback.format_exc()
    print(out)
    input('Press enter to let agent continue...')
    print('-----------------')
    history.append((response, out))

