import { component$ } from "@builder.io/qwik";
import styles from "./hero.module.css";

export default component$(() => {
  return (
    <div class={["container", styles.hero]}>
      <h1>
        Aqui <span class="highlight">Pegala</span>
      </h1>
      <p>Tu App para Rifas</p>
    </div>
  );
});
