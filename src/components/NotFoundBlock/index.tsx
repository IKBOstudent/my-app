import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <>
      <h1 className={styles.root}>Ничего не найдено :(</h1>
      <h4>Страница не найдена, либо еще не создана</h4>
    </>
  );
}

export default NotFoundBlock;
