import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <>
      <h1 className={styles.root}>Ничего не найдено :(</h1>
      <h4>Страница не найдена, либо еще не создана</h4>
    </>
  );
};
