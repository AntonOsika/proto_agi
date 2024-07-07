# A maximally general LLM agent

_Warning: This code executes LLM generated code and can mess up your computer or worse. Don't run it._

If you are destructively curious, you could _hypothetically_:

    pip install openai
    OPENAI_API_KEY=[api_key] python run.py

Original 16 lines of code implementation [here](https://gist.github.com/AntonOsika/3b5c43ecf883eb50cc59285d44f85010)

```
goal = input('what do you want, human?')
agent_code = open(__file__).read()

history = []
while True:
    prompt = f'''
    You are `llm` in this python code: {agent_code}
    history: {history}
    goal: {goal}
    '''

    code = llm(prompt)
    res = exec(code, globals(), locals())
    history.append((code, res))
```

_Run it with gloves:_

```
docker build . --tag proto_agi
docker run -ti -e OPENAI_API_KEY=sk-XYZ
```

# Dedication

This code actually works. But it was mainly created as a meme to illustrate the power of capable LLMs.
Power is usually a good thing. But it can be directed to power-grabbing in conflicts, war and other zero-sum-games – rather than furthering humanity.

If you still think AGI is sci-fi or too far away to matter, consider checking out [https://www.safe.ai/work/statement-on-ai-risk](https://www.safe.ai/work/statement-on-ai-risk) and who disagree with your viewpoint.

I think it is fair to say that the people on the above list uniformly agree that world leaders, and society, should already today think hard about how we want a post-AGI world to look and what is necessary to achieve that.

As of 2024, world leaders and those of influence haven't woken up to the short timeline of what is going to happen. If you are a person of influence or in a position to talk about this topic with important people, consider doing so. I think that significantly improves the chance for us to live in the flourishing, conflict-free world we _could_ live in thanks to coming AI advancements.
