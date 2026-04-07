"use client";

export default function Login() {
    return (
        <section className="mt-8 lg:mx-40">
      <form >
        <label>
          <span>Почта</span>
          <input
            type="email"
            name="email"
            placeholder="podgoroy@example.com"
            autoComplete="email"
            value={"email"}
            // onChange={(ev) => setEmail(ev.target.value)}
          />
        </label>
        <label>
          <span>Пароль</span>
          <input
            type="password"
            name="password"
            autoComplete="password"
            placeholder="•••••••••"
            value={"password"}
            // onChange={(ev) => setPassword(ev.target.value)}
          />
        </label>
        <button type="submit" className="submit_button">
          Войти
        </button>
      </form>
      <br />
      <button onClick={() =>
        //   signIn("yandex", {
        //     callbackUrl: "http://localhost:3000/",
        //   })
        console.log("yandex")
        }
      >
        Войти с ЯндексID
      </button>
    </section>
    );
}
