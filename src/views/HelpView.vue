<template>
  <AppPage
    back
    title="Помощь"
  >
    <QuestionItem
      v-for="question in questions"
      :key="question.title"
      :question="question"
    >
    </QuestionItem>
  </AppPage>
</template>

<script>
import AppPage from "../components/ui/AppPage";
import QuestionItem from "../components/question/QuestionItem";
export default {
  components: { AppPage, QuestionItem },
  setup() {
    const questions = [
      {
        title: "Что есть в данной системе?",
        text: "Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял",
      },
      { title: "Как тут работает авторизация?", text: "Все реализовано через Firebase" },
    ];

    return {
      questions,
    };
  },
};
</script>
