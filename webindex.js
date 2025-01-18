const prompts = [
    { key: "pTitle", question: "What is your project title?" },
    { key: "pMotive", question: "What is your motivation for building this project?" },
    { key: "pReason", question: "Why did you build this project?" },
    { key: "pProblem", question: "What problems did it solve?" },
    { key: "pLearn", question: "What did you learn while building this project?" },
    { key: "pInstall", question: "What are the steps for installing your project?" },
    { key: "pUsage", question: "What are the steps of using this application?" },
    { key: "pCollabs", question: "Who helped with building this application?" },
    { key: "pCredits", question: "What other credits are there?" },
    { key: "pLicense", question: "What license would you like to use? (MIT/Apache 2.0/BSD 2/IBM V1/GNU GPL v2)" },
    { key: "pBadges", question: "Enter any badges you want (or none):" },
    { key: "pFeatures", question: "Explain any features you have added (or none):" },
    { key: "pEmail", question: "What is your email address?" },
    { key: "pGithub", question: "What is the GitHub repository link?" },
    { key: "pWeb", question: "What is your website address?" },
    { key: "pGithubName", question: "What is your GitHub username?" },
    { key: "pTest", question: "What would you like to include about testing?" }
  ];
  
  let responses = {};
  let currentPromptIndex = 0;
  
  const terminal = document.getElementById("terminal");
  const input = document.getElementById("cli-input");
  const submitBtn = document.getElementById("cli-submit");
  
  // Display the next question
  function displayNextPrompt() {
    if (currentPromptIndex < prompts.length) {
      const currentPrompt = prompts[currentPromptIndex];
      document.getElementById("prompt").textContent = currentPrompt.question;
    } else {
      generateReadme();
    }
  }
  
  // Handle user input
  function handleInput() {
    const userResponse = input.value.trim();
    if (!userResponse) return;
  
    // Save the response
    const currentPrompt = prompts[currentPromptIndex];
    responses[currentPrompt.key] = userResponse;
  
    // Display the user's response in the terminal
    terminal.innerHTML += `> ${userResponse}\n`;
  
    // Clear input and move to the next question
    input.value = "";
    currentPromptIndex++;
    displayNextPrompt();
  }
  
  // Generate README content
  function generateReadme() {
    const { pTitle, pMotive, pReason, pProblem, pLearn, pInstall, pUsage, pCollabs, pCredits, pLicense, pBadges, pFeatures, pEmail, pGithub, pWeb, pGithubName, pTest } = responses;
  
    const readme = `
  # ${pTitle}
  
  ## Description
  - Motivation: ${pMotive}
  - Reason: ${pReason}
  - Problem Solved: ${pProblem}
  - Learning: ${pLearn}
  
  ## Installation
  ${pInstall}
  
  ## Usage
  ${pUsage}
  
  ## Credits
  ${pCollabs} - ${pCredits}
  
  ## License
  ${pLicense}
  
  ## Badges
  ${pBadges}
  
  ## Features
  ${pFeatures}
  
  ## Contact
  - Email: ${pEmail}
  - GitHub: ${pGithub}
  - Website: ${pWeb}
  
  ## Testing
  ${pTest}
    `;
  
    // Display the generated README
    terminal.innerHTML += `\nGenerated README:\n${readme}\n`;
  
    // Provide a download link
    const blob = new Blob([readme], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${pTitle || "README"}.md`;
    link.textContent = "Download your README";
    terminal.appendChild(link);
  }
  
  // Attach event listeners
  submitBtn.addEventListener("click", handleInput);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleInput();
  });
  