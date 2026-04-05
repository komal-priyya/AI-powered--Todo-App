🌸 AI-Powered Todo App
--

A modern and smart Todo application built with React and Tailwind CSS, enhanced with AI features using Ollama (LLaMA 3).


This app not only lets you manage tasks but also helps you improve tasks and break them into actionable steps using AI
---------------------------------------------------------------------------








**🚀 Features :**

 ✅ Add, edit, delete tasks

 ✅ Mark tasks as completed

 ✨ Improve task clarity using AI

 🧠 Break tasks into 3–5 actionable steps

 ❌ Cancel AI-generated steps

 🎨 Clean and responsive UI (Tailwind CSS)

---





🧪 How It Works

 📌 localStorage Persistence

 ✨ Tasks are stored in browser storage

 ✨ Automatically loaded on app start

 ✨ Updates whenever tasks change

📌 AI Integration

✨ Uses LLaMA3 via Ollama

✨ Sends task as prompt

✨ Returns improved text or steps




---

**🖼️ Preview**


<img width="935" height="659" alt="image" src="https://github.com/user-attachments/assets/5399319f-09e3-48f1-8f53-c73126c95016" />


---

<img width="944" height="703" alt="image" src="https://github.com/user-attachments/assets/3ff99fc7-eee5-4c07-9dd5-761da82048a2" />


---

<img width="956" height="595" alt="image" src="https://github.com/user-attachments/assets/07bd6e69-90b2-4de5-b5ed-78f44cb6ef67" />

---

<img width="932" height="844" alt="image" src="https://github.com/user-attachments/assets/20ba27ad-d56b-4bdb-9d75-fd84ffd78a51" />

---

<img width="936" height="654" alt="image" src="https://github.com/user-attachments/assets/57a3e3ac-bd34-431d-a5e5-3fc00e1cba1e" />





---




**🛠️ Tech Stack**
⚛️ React (Frontend)

🎨 Tailwind CSS (Styling)

🤖 Ollama (Local AI)

🧠 LLaMA 3 Model


---





📂 Project Structure

Todo-App/

│── src/

│   ├── components/

│   │   └── Todo.jsx

│   ├── App.js

│   └── main.jsx

│
│── public/

│── package.json

│── README.md
---






 ⚙️ Installation & Setup
 
** 1️⃣ Clone the repository:**
```
git clone https://github.com/your-username/react-todo-app.git


```


** 2️⃣ Install dependencies:**
```
npm install
Run the app:
npm run dev
```
---

**3️⃣ Setup Environment Variables**

Create a .env file in the root:

If using Vite:
```
VITE_OLLAMA_URL=http://localhost:11434/api/generate
```
If using Create React App:
```
REACT_APP_OLLAMA_URL=http://localhost:11434/api/generate
```

---


**4️⃣ Run Ollama**

Make sure Ollama is installed and running:

ollama pull llama3

ollama serve

---


**5️⃣ Start the App**

npm run dev

---





**⚠️ Important Notes**

✨AI features will only work if Ollama is running locally

✨This project does not use any external API keys

✨.env file is not included for security reasons

---






**🎯 Future Improvements**

🔄 Add localStorage support (persist tasks after refresh)

❌ Add Cancel button during editing

🔍 Task search & filtering (completed / pending)

📅 Add due dates & reminders

🌙 Dark mode support

🎯 Drag & drop task reordering

🔔 Notifications for pending tasks

📱 Improve mobile responsiveness

📊 Task analytics

🔐 User authentication

☁️ Cloud-based AI integration


---







**🙌 Acknowledgements**

✨Ollama for local AI support

✨Meta LLaMA 3 model

✨React & Tailwind community

---







**💡 Learning Highlights**


**This project demonstrates**:

 ✨ State management using useState

✨ Conditional rendering in React

✨ Handling user input and events

✨ Component-based UI design

✨ Styling with Tailwind CSS


---



**💡 Author**

KOMAL PRIYA

---




⭐ Show Your Support


If you like this project, consider giving it a ⭐ 

