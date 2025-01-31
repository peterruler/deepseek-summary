#!/bin/bash
curl -X POST https://api.deepseek.com/v1/summarize \
-H "Authorization: Bearer <Api-Key>" \
-H "Content-Type: application/json" \
-d '{"text": "Dies ist ein Testtext, der zusammengefasst werden soll."}'