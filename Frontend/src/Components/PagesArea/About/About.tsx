import "./About.css";
import myPicture from "../../../assets/‏‏Hi.webp";

export function About() {
    return (
        <div className="About">
            <div>

                <section className="hero">
                    <h1>מערכת שיחות GPT</h1>
                    <p>
                        פלטפורמה לניהול שיחות עם GPT באמצעות OpenAI API,
                        כולל שמירת היסטוריית שיחות, המשך שיחות קיימות
                        ויצירת שיחות חדשות בצורה פשוטה ונוחה.
                    </p>
                </section>
            </div>

            <div className="cards-container">



                <section className="card">
                    <h2>אודות המערכת</h2>
                    <p>
                        מערכת זו מאפשרת למשתמשים לנהל שיחות עם מודלי GPT
                        באמצעות ממשק מודרני ונוח. כל שיחה נשמרת במסד הנתונים
                        וניתן לחזור אליה בכל עת, להמשיך את הדיון או לפתוח שיחה חדשה.
                    </p>
                    <br />
                    <p>
                        הארכיטקטורה מבוססת Frontend ו-Backend נפרדים,
                        עם תקשורת מאובטחת באמצעות REST API.
                    </p>
                </section>

                <section className="card">
                    <h2>יכולות עיקריות</h2>

                    <ul className="features">
                        <li>💬 יצירת שיחות חדשות עם GPT</li>
                        <li>📚 שמירת היסטוריית שיחות במסד הנתונים</li>
                        <li>🔄 המשך שיחות קיימות בכל זמן</li>
                        <li>⚡ תקשורת מהירה באמצעות FastAPI</li>
                        <li>🎨 ממשק משתמש מודרני עם React ו-MUI</li>
                        <li>🔐 שימוש במפתח OpenAI פרטי של המשתמש</li>
                    </ul>
                </section>

                <section className="card">
                    <h2>טכנולוגיות</h2>

                    <div className="tech-grid">
                        <div className="tech-item">
                            FastAPI (Python)
                        </div>

                        <div className="tech-item">
                            React (TypeScript)
                        </div>

                        <div className="tech-item">
                            OpenAI API
                        </div>

                        <div className="tech-item">
                            Material UI (MUI)
                        </div>
                    </div>
                </section>


                <section className="card">
                    <h2>פרטי בונה באתר</h2>

                    <div className="developer-info">
                        <div className="contact-details">
                            <p><strong>שם:</strong>  אבישי דוידי</p>
                            <p><strong>טלפון:</strong>  <a href="tel:054-2169111">054-2169111</a></p>
                            <p><strong>דוא"ל:</strong>  <a href="mailto:abushking4@gmail.com">abushking4@gamil.com</a></p>
                        </div>
                        <img src={myPicture} alt="Profile Picture" className="profile-pic" />
                    </div>
                </section>


            </div>

        </div>
    );
}
