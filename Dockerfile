FROM python:3.12-slim

COPY run.py /run.py
RUN pip install openai

CMD ["python", "/run.py"]