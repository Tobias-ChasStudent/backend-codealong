document.addEventListener("DOMContentLoaded", () => {
  let closeFlashButton = document.querySelector("span.close-flash");
  if (closeFlashButton) {
    closeFlashButton.addEventListener("click", closeFlashMessage);
  }

  const completeStepCheckboxes = document.querySelectorAll(
    "input.complete-step"
  );
  if (completeStepCheckboxes) {
    completeStepCheckboxes.forEach((x) =>
      x.addEventListener("click", completeStep)
    );
  }

  const paths = document.querySelectorAll(".path");
  if (paths) {
    paths.forEach((x) => calculateProgress(x));
  }
});

const closeFlashMessage = (ev) => {
  const flashMessage = ev.target.parentElement;
  flashMessage.remove();
};

const completeStep = async (ev) => {
  const checkbox = ev.target;
  const { pathId, stepId } = checkbox.dataset;
  const done = checkbox.dataset.done === "true";
  console.log({ pathId, stepId });
  const response = await fetch("/api/profile/update-step", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pathId, stepId, done: !done }),
  });

  if (response.ok) {
    console.log("Response ok");
    const step = checkbox.parentElement;
    checkbox.dataset.done = done ? "false" : "true";
    calculateAllProgress();
  }
};

const calculateAllProgress = () => {
  const paths = document.querySelectorAll(".path");
  if (paths) {
    paths.forEach((x) => calculateProgress(x));
  }
};

const calculateProgress = (el) => {
  let steps = el.querySelectorAll("input.complete-step");
  let totalSteps = steps.length;

  let completedSteps = el.querySelectorAll(
    'input.complete-step[data-done="true"]'
  ).length;

  const progress = el.querySelector(".progress-bar");

  progress.style.width = `${(completedSteps / totalSteps) * 100}%`;

  const stepsCount = el.querySelector(".steps-count");
  stepsCount.innerText = `${completedSteps} / ${totalSteps} | ${progress.style.width}`;

};
