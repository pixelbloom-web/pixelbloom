function showApology(name, message) {
    const result = document.getElementById("result");
    result.replaceChildren();

    const card = document.createElement("div");
    card.className = "apology-card";

    const heading = document.createElement("h2");
    heading.textContent = `Dear ${name}, 💌`;

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    const ending = document.createElement("p");
    ending.textContent = "I hope we can make things right. 💗";

    card.append(heading, paragraph, ending);
    result.appendChild(card);
}

function createApology() {
    const name = document.getElementById("personName").value.trim();
    const message = document.getElementById("apologyMessage").value.trim();
    const result = document.getElementById("result");

    if (!name || !message) {
        result.textContent = "Please enter a name and message! 💗";
        return;
    }

    showApology(name, message);

    const link = new URL(window.location.href);
    link.search = new URLSearchParams({
        to: name,
        message: message
    }).toString();

    const linkBox = document.createElement("div");
    linkBox.style.marginTop = "20px";

    const label = document.createElement("p");
    label.textContent = "Your special apology link 💌";

    const linkInput = document.createElement("input");
    linkInput.type = "text";
    linkInput.readOnly = true;
    linkInput.value = link.href;

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy My Link 🔗";

    copyButton.onclick = async function () {
        try {
            await navigator.clipboard.writeText(link.href);
            copyButton.textContent = "Copied! 💗";
        } catch {
            linkInput.select();
            copyButton.textContent = "Select and copy the link";
        }
    };

    linkBox.append(label, linkInput, copyButton);
    result.appendChild(linkBox);
}

window.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");
    const message = params.get("message");

    if (name && message) {
    document.querySelector(".generator").style.display = "none";
    showApology(name, message);
}
});