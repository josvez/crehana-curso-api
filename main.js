      const d = document,
      $table = d.querySelector(".crud-table"),
      $form = d.querySelector(".crud-form"),
      $title = d.querySelector(".crud-title"),
      $template = d.getElementById("crud-template").content,
      $fragment = d.createDocumentFragment();


    const getAll = async () => {
      try {
        let res = await fetch("http://localhost:3000/laptops"),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        console.log(json);
        json.forEach(el => {
          $template.querySelector(".nombre").textContent = el.nombre;
          $template.querySelector(".marca").textContent = el.marca;
          $template.querySelector(".edit").dataset.id = el.id;
          $template.querySelector(".edit").dataset.nombre = el.nombre;
          $template.querySelector(".edit").dataset.marca = el.marca;
          $template.querySelector(".delete").dataset.id = el.id;

          let $clone = d.importNode($template, true);
          $fragment.appendChild($clone);
        });

        $table.querySelector("tbody").appendChild($fragment);
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
      }
    }

    d.addEventListener("DOMContentLoaded", getAll);

    d.addEventListener("submit", async e => {
      if (e.target === $form) {
        e.preventDefault();

        if (!e.target.id.value) {
          //Create - POST
          try {
            let options = {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({
                nombre: e.target.nombre.value,
                marca: e.target.marca.value
              })
            },
              res = await fetch("http://localhost:3000/laptops", options),
              json = await res.json();

            if (!res.ok) throw { status: res.status, statusText: res.statusText };

            location.reload();
          } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
          }
        } else {
          //Update - PUT
          try {
            let options = {
              method: "PUT",
              headers: {
                "Content-type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({
                nombre: e.target.nombre.value,
                marca: e.target.marca.value
              })
            },
              res = await fetch(`http://localhost:3000/laptops/${e.target.id.value}`, options),
              json = await res.json();

            if (!res.ok) throw { status: res.status, statusText: res.statusText };

            location.reload();
          } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
          }
        }
      }
    });
	
    d.addEventListener("click", async e => {
      if (e.target.matches(".edit")) {
        $title.textContent = "Editar Marca";
        $form.nombre.value = e.target.dataset.nombre;
        $form.marca.value = e.target.dataset.marca;
        $form.id.value = e.target.dataset.id;
      }

      if (e.target.matches(".delete")) {
        let isDelete = confirm(`¿Estás seguro de eliminar el id ${e.target.dataset.id}?`);
        

        if (isDelete) {
          //Delete - DELETE
          try {
            let options = {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=utf-8"
              }
            },
              res = await fetch(`http://localhost:3000/laptops/${e.target.dataset.id}`, options),
              json = await res.json();

            if (!res.ok) throw { status: res.status, statusText: res.statusText };

            location.reload();
          } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            alert(`Error ${err.status}: ${message}`);
          }
        }
      }
    });