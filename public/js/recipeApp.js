$(document).ready(() => {
  const socket = io();

  $("#chatForm").submit(() => {
    socket.emit("message");
    $("#chat-input").val("");
    return false;
  });

  socket.on("message", (message) => {
    displayMessage(message.content);
  });

  let displayMessage = (message) => {
    $("#chat").prepend($("<li>").html(message));
  };

  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/courses", (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach((course) => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<div class="course-description">
							${course.description}              
              <button class='button ${
                course.joined
                  ? "btn disabled"
                  : "waves-effect waves-light btn-small"
              }' data-id="${course._id}">${
            course.joined ? "Joined" : "Join"
          }</button>
            </div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".waves-effect").click((event) => {
    let $button = $(event.target),
      courseId = $button.data("id");
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("btn disabled")
          .removeClass("waves-effect waves-light btn-small");
      } else {
        $button.text("Try again");
      }
    });
  });
};
