FROM node:latest
# FROM เอาไว้เลือก Base Image จาก Docker Hub ที่ต้องการใช้เป็นสภาพแวดล้อม

LABEL maintainer="admin"

LABEL description="This dockerfile for install the backend-used-to-book."

# Install MongoDB tools
# RUN apt-get update && apt-get install -y mongo-tools

WORKDIR /app
# WORKDIR คิือการกำหนด directory ของการทำงาน 
# เพื่อให้คำสั่งอื่นๆของ Docker ไปทำงานที่นั่น ซึ่งในที่นี้เป็น /app

COPY package.json ./
# คัดลอก package.json ไปใส่ที่ ./

COPY package-lock.json ./
# คัดลอก package-lock.json ไปใส่ที่ ./

RUN npm install
# ในที่นี้ คือ จาก ./ ไปหา ./

COPY ./ ./
# COPY คือคำสั่งที่คัดลอกโค้ดจาก directory ต้นทาง ไปหา ปลายทาง 
# ในที่นี้ คือ จาก ./ ไปหา ./

ENV NODE_ENV production

# EXPOSE 7000

CMD ["npm", "run", "dev"]
# CMD คีอ การใส่คำสั่งเพื่อรันโปรแกรม จากตัวอย่างคือ คำสั่ง "npm run dev"