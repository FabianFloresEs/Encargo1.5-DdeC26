/* ==========================================
    PREVISUALIZACIÓN DE PROYECTOS
========================================== */

const projectModal = document.getElementById("project-modal");

if (projectModal){

    const projectData = {

        enrutate: {

            title:
                "Enrútate",

            category:
                "Diseño de Interacción · 2026",

            description:
                "Juego de recorrido que explora decisiones, desvíos e interrupciones como parte de la experiencia.",

            image:
                "assets/EnrutateInterfazExpresivaFF-U3TiX26.gif",

            alt:
                "Interfaz expresiva del proyecto Enrútate",

            zoom: false,

            keywords: [
                "Recorridos",
                "Interfaz expresiva",
                "Desvíos",
                "Efectos de interrupción",
                "Interpretación Digital del Juego"
            ],

            wiki:
                "https://wiki.ead.pucv.cl/Enr%C3%BAtate"

        },

        "ciudad-legible": {

            title:
                "Ciudad Legible",

            category:
                "Diseño Visual · 2024",

            description:
                "Proyecto visual centrado en organizar información y construir una lectura clara mediante recursos gráficos.",

            image:
                "assets/ProyectoFinal.TCL.Pag1.jpg",

            alt:
                "Proyecto Ciudad Legible",

            keywords: [
                "Cartografía",
                "Jardín Botánico Viña del Mar",
                "Pictogramas",
                "Imagen de Marca"
            ],

            wiki:
                "https://wiki.ead.pucv.cl/Proyecto_de_Dise%C3%B1o_Visual_-_Fabi%C3%A1n_Flores"

        },

        "ocasion-editorial": {

            title:
                "Ocasión Editorial",

            category:
                "Diseño Editorial · 2025",

            description:
                "Propuesta editorial que explora composición, texto, imagen y soporte impreso.",

            image:
                "assets/CuerpoEngarce.TiroFF-U2TOE25.jpg",

            alt:
                "Proyecto Ocasión Editorial",

            keywords: [
                "Diseño editorial",
                "Fiordos en la X Región",
                "Serie de ediciones",
                "Ilustraciones",
                "Estudio historico y geográfico"
            ],

            wiki:
                "https://wiki.ead.pucv.cl/Entrega_U2_TOE_2025_-_Fabi%C3%A1n_Flores"

        },

        tipografia: {

            title:
                "Runde Fraktur",

            category:
                "Tipografía · 2025",

            description:
                "Espécimen dedicado a Runde Fraktur, su estructura y sus posibilidades de composición tipográfica.",

            image:
                "assets/EspecimenTip.RundeFraktur-FF.Pag1.jpg",

            alt:
                "Espécimen tipográfico Runde Fraktur",

            keywords: [
                "Runde Fraktur",
                "Tipografía",
                "Espécimen",
                "Jerarquía",
                "Composición"
            ],

            wiki:
                "https://wiki.ead.pucv.cl/Tarea_10_%E2%80%93_Esp%C3%A9cimen_Tipogr%C3%A1fico_/_Fabi%C3%A1n_Flores"

        }

    };

    const modalImage = document.getElementById("project-modal-image");
    const modalMedia = projectModal.querySelector(".project-modal-media");
    const modalCategory = document.getElementById("project-modal-category");
    const modalTitle = document.getElementById("project-modal-title");
    const modalDescription = document.getElementById("project-modal-description");
    const modalKeywords = document.getElementById("project-modal-keywords");
    const modalWiki = document.getElementById("project-modal-wiki");
    const closeButton = projectModal.querySelector(".project-modal-close");

    let lastProjectTrigger = null;

    const zoomControl = projectModal.querySelector(".project-modal-zoom-control");
    const zoomRange = projectModal.querySelector(".project-zoom-range");
    const zoomInButton = projectModal.querySelector(".project-zoom-in");
    const zoomOutButton = projectModal.querySelector(".project-zoom-out");
    const zoomValue = projectModal.querySelector(".project-zoom-value");

    /* ======================================
    ZOOM DE IMAGEN
    ====================================== */

    let zoomScale = 1;

    let panX = 0;
    let panY = 0;

    let isDraggingImage = false;

    let dragStartX = 0;
    let dragStartY = 0;

    let dragStartPanX = 0;
    let dragStartPanY = 0;


    const MIN_ZOOM = 100;
    const MAX_ZOOM = 600;
    const ZOOM_STEP = 25;


    function applyImageTransform(){

        modalImage.style.transform =
            `
            translate3d(
                ${panX}px,
                ${panY}px,
                0
            )
            scale(${zoomScale})
            `;
    }

    function updateZoomState(){

        const percentage =
            Math.round(
                zoomScale * 100
            );


        zoomRange.value =
            percentage;


        zoomValue.textContent =
            `${percentage}%`;


        if (zoomScale > 1) {

            modalMedia.classList.add(
                "is-zoomed"
            );

        } else {

            modalMedia.classList.remove(
                "is-zoomed"
            );

            panX = 0;
            panY = 0;

        }
        clampPan();
        applyImageTransform();
    }

    function setZoom(
        percentage
    ){

        const safePercentage =
            Math.max(
                MIN_ZOOM,
                Math.min(
                    MAX_ZOOM,
                    percentage
                )
            );

        zoomScale =
            safePercentage / 100;

        updateZoomState();
    }

    function resetZoom(){

        zoomScale = 1;

        panX = 0;
        panY = 0;

        isDraggingImage = false;

        modalMedia.classList.remove(
            "is-zoomed",
            "is-dragging"
        );

        zoomRange.value =
            MIN_ZOOM;

        zoomValue.textContent =
            "100%";

        applyImageTransform();

    }

    function clampPan(){

        const maxX =
            Math.max(
                0,
                (
                    modalImage.offsetWidth
                    * zoomScale
                    - modalMedia.clientWidth
                ) / 2
            );

        const maxY =
            Math.max(
                0,
                (
                    modalImage.offsetHeight
                    * zoomScale
                    - modalMedia.clientHeight
                ) / 2
            );

        panX =
            Math.max(
                -maxX,
                Math.min(
                    maxX,
                    panX
                )
            );

        panY =
            Math.max(
                -maxY,
                Math.min(
                    maxY,
                    panY
                )
            );
    }

    /* Barra manual */
    zoomRange.addEventListener(
        "input",
        () => {
            setZoom(
                Number(
                    zoomRange.value
                )
            );
        }
    );

    /* Acercar */
    zoomInButton.addEventListener(
        "click",
        () => {
            setZoom(
                zoomScale * 100
                + ZOOM_STEP
            );
        }
    );

    /* Alejar */
    zoomOutButton.addEventListener(
        "click",
        () => {
            setZoom(
                zoomScale * 100
                - ZOOM_STEP
            );
        }
    );

    /* ======================================
       ARRASTRAR IMAGEN AMPLIADA
    ====================================== */

    modalMedia.addEventListener(
        "pointerdown",
        (event) => {

            if (
                zoomScale <= 1 ||
                event.target.closest(
                    ".project-modal-zoom-control"
                )
            ) {
                return;
            }

            event.preventDefault();

            isDraggingImage = true;

            dragStartX =
                event.clientX;

            dragStartY =
                event.clientY;

            dragStartPanX =
                panX;

            dragStartPanY =
                panY;

            modalMedia.classList.add(
                "is-dragging"
            );

            modalMedia.setPointerCapture(
                event.pointerId
            );

        }
    );

    modalMedia.addEventListener(
        "pointermove",
        (event) => {

            if (!isDraggingImage) {
                return;
            }

            panX =
                dragStartPanX
                + event.clientX
                - dragStartX;

            panY =
                dragStartPanY
                + event.clientY
                - dragStartY;

            clampPan();

            applyImageTransform();

        }
    );

    function stopImageDrag(
        event
    ){

        if (!isDraggingImage) {
            return;
        }

        isDraggingImage = false;

        modalMedia.classList.remove(
            "is-dragging"
        );

        if (
            modalMedia.hasPointerCapture(
                event.pointerId
            )
        ) {

            modalMedia.releasePointerCapture(
                event.pointerId
            );

        }

    }

    modalMedia.addEventListener(
        "pointerup",
        stopImageDrag
    );

    modalMedia.addEventListener(
        "pointercancel",
        stopImageDrag
    );

    /* ======================================
       ABRIR PROYECTO
    ====================================== */

    document .querySelectorAll(".project-preview-trigger")
        .forEach(trigger => {
            trigger.addEventListener("click", () => {
                const project = trigger.dataset.project;
                const data = projectData[project];

                if (!data) {return;}

                lastProjectTrigger = trigger;
                resetZoom();

                const zoomEnabled = data.zoom !== false;
                zoomControl.hidden = !zoomEnabled;
                const previewImage = trigger .closest(".project-card") ?.querySelector(".project-image img");

                modalImage.src =
                    previewImage
                        ?.getAttribute("src")
                    || data.image;

                modalImage.alt =
                    previewImage
                        ?.getAttribute("alt")
                    || data.alt;

                modalCategory.textContent = data.category;
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;
                modalWiki.href = data.wiki;
                modalKeywords.innerHTML = "";

                data.keywords.forEach(keyword => {
                    const tag = document.createElement("li");
                    tag.textContent = keyword;
                    modalKeywords.appendChild(tag);
                });

                document.body.classList.add("modal-open");
                projectModal.showModal();
                closeButton.focus();
            });
        });

    /* ======================================
       CERRAR
    ====================================== */

    closeButton.addEventListener("click", () => {projectModal.close();});

    projectModal.addEventListener("click", (event) => {
        if (event.target === projectModal) {projectModal.close();}
    });

    projectModal.addEventListener("close", () => {
        document.body.classList.remove("modal-open");
        resetZoom();
        modalImage.removeAttribute("src");
        modalImage.alt = "";

        if (lastProjectTrigger) {
            lastProjectTrigger.focus();
            lastProjectTrigger = null;
        }}
    );
}

/* == PREFERENCIA DE MOVIMIENTO == */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ==========================================
   APARICIÓN DE SECCIONES
========================================== */

const sections = document.querySelectorAll(".section");

if (sections.length && !prefersReducedMotion.matches) {

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(
            entry => {
                if (!entry.isIntersecting){return;}
                entry.target.classList.add("show");
                observerInstance.unobserve(entry.target);
            }
        );}, {threshold:0.12, rootMargin: "0px 0px -40px 0px"}
    );

    sections.forEach(
        section => {
            section.classList.add("hidden");
            observer.observe(section);
        }
    );

}

/* ==========================================
   SCROLL SUAVE PARA ENLACES INTERNOS
========================================== */

const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

links.forEach(link => {
    link.addEventListener("click",function (event){
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) {return;}
        event.preventDefault();
        target.scrollIntoView({ behavior:prefersReducedMotion.matches ? "auto" : "smooth"});
    });
});

/* ==========================================
   FILTROS Y ORDEN DE EJERCICIOS
========================================== */

const exerciseList = document.getElementById("exercise-list");

if (exerciseList){
    const filterButtons = document.querySelectorAll(".exercise-filter");
    const sortSelect = document.getElementById("exercise-sort");
    const exerciseCards = Array.from(exerciseList.querySelectorAll(".exercise-card"));
    let activeFilter = "all";

    /* ======================================
       COMPROBAR CATEGORÍA
    ====================================== */

    function matchesExerciseFilter(card,filter){
        if (filter === "all") {return true;}
        const categories = (card.dataset.category || "").split(/\s+/);
        return categories.includes(filter);
    }

    /* ======================================
       MOSTRAR / OCULTAR
    ====================================== */

    function filterExercises(){
        exerciseCards.forEach(card => {
            const shouldShow = matchesExerciseFilter(card, activeFilter);
            card.hidden = !shouldShow;}
        );
    }

    /* ======================================
       ORDENAR
    ====================================== */

    function sortExercises(){
        const order = sortSelect?.value || "newest";
        const sortedCards = [...exerciseCards].sort(
            (a, b) => {
                const orderA = Number(a.dataset.order) || 0;
                const orderB = Number(b.dataset.order) || 0;

                 if (order === "oldest") {return (orderA - orderB);}
                  return (orderB - orderA);
            }
        );
        sortedCards.forEach(card => {exerciseList.appendChild(card);});
    }

    /* ======================================
       ACTUALIZAR GALERÍA
    ====================================== */

    function updateExercises(){
        filterExercises();
        sortExercises();
    }

    /* ======================================
       BOTONES DE FILTRO
    ====================================== */

    filterButtons.forEach(
        button => {
            button.addEventListener("click",() => {
                activeFilter = button.dataset.filter;
                filterButtons.forEach(item => {item.classList.remove("active");});
                button.classList.add("active");
                updateExercises();}
            );
        }
    );

    /* ======================================
       SELECTOR DE ORDEN
    ====================================== */

    if (sortSelect) {sortSelect.addEventListener("change", updateExercises);}
    updateExercises();

}

/* ==========================================
   AÑO AUTOMÁTICO EN EL FOOTER
========================================== */

const copyright = document.getElementById("copyright");

if (copyright){

    copyright.innerHTML = `© ${new Date().getFullYear()} · Fabián Flores`;

}

/* ==========================================
   FORMULARIO DE CONTACTO
========================================== */

const contactForm =
    document.getElementById(
        "contact-form"
    );

if (contactForm){

    const formStatus =
        document.getElementById(
            "contact-form-status"
        );

    const submitButton =
        contactForm.querySelector(
            ".contact-submit"
        );

    const defaultButtonText =
        submitButton.textContent;

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            /* Evita intentar enviar
               si todavía no configuraste Formspree */

            if (
                contactForm.action.includes(
                    "TU_ID_DE_FORMULARIO"
                )
            ) {

                formStatus.textContent =
                    "Debes configurar el formulario antes de enviarlo.";

                formStatus.className =
                    "form-status is-error";

                return;

            }

            submitButton.disabled =
                true;

            submitButton.textContent =
                "Enviando...";

            formStatus.textContent =
                "";

            formStatus.className =
                "form-status";

            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {

                            method:"POST",

                            body:
                                new FormData(
                                    contactForm
                                ),

                            headers:{

                                "Accept":
                                    "application/json"

                            }

                        }
                    );

                if (response.ok) {

                    formStatus.textContent =
                        "Mensaje enviado correctamente. ¡Gracias por escribirme!";

                    formStatus.className =
                        "form-status is-success";

                    contactForm.reset();

                } else {

                    formStatus.textContent =
                        "No se pudo enviar el mensaje. Inténtalo nuevamente.";

                    formStatus.className =
                        "form-status is-error";

                }

            } catch (error) {

                formStatus.textContent =
                    "Ocurrió un error de conexión. Inténtalo nuevamente.";

                formStatus.className =
                    "form-status is-error";

            } finally {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    defaultButtonText;


            }


        }
    );

}

/* ==========================================
   INTERACCIÓN DEL HERO
========================================== */

const hero = document.querySelector(".hero");

if (hero){
    let isHolding = false;
    let activePointerId = null;
    let wordRevealTimer = null;
    const WORD_REVEAL_TIME = 2600;

    let holdEffect = null;

    let lastHoldTrailX = 0;
    let lastHoldTrailY = 0;

    const HOLD_TRAIL_DISTANCE = 35;

    /* ======================================
        CONTROL DE ONDAS Y COOLDOWN
    ====================================== */

    let rippleCharges = 2;

    let rippleCooldown = false;

    const RIPPLE_COOLDOWN = 1000;

    /* ======================================
       DEFORMACIÓN DEL CONTENIDO
    ====================================== */

    function distortHeroElement(element, clickX, clickY, heroRect){

        const elementRect = element.getBoundingClientRect();

        const elementX = elementRect.left + elementRect.width / 2 - heroRect.left;
        const elementY = elementRect.top + elementRect.height / 2 - heroRect.top;

        const deltaX = elementX - clickX;
        const deltaY = elementY - clickY;

        const distance = Math.hypot(deltaX, deltaY);

        const directionX = distance > 0 ? deltaX / distance : 0;
        const directionY = distance > 0 ? deltaY / distance : 0;

        const strength = Math.max(0.20, 1 - distance / 1100);

        const movement=14*strength;
        const moveX=directionX*movement;
        const moveY=directionY*movement;
        const delay=Math.min(distance*1.7,1700);

        element.animate([
            {transform: "translate3d(0, 0, 0) scaleX(1) scaleY(1)", offset: 0},
            {
                transform: `translate3d(${moveX}px, ${moveY}px, 0) scaleX(${1 + .012 * strength}) scaleY(${1 - .008 * strength}) skewX(${directionX * 1.2 * strength}deg)`,
                offset:.38
            },
            {
                transform: `translate3d(${moveX * -.25}px, ${moveY * -.25}px, 0) scaleX(${1 - .006 * strength}) scaleY(${1 + .006 * strength}) skewX(${directionX * -.6 * strength}deg)`,
                offset:.70
            },
            {transform: "translate3d(0, 0, 0) scaleX(1) scaleY(1)", offset: 1}
        ],{
            duration: 1100,
            delay: delay,
            easing: "cubic-bezier(.22, .65, .25, 1)"
        });
    }

    /* ======================================
    PALABRAS OCULTAS
    ====================================== */

    function revealHeroWords(x,y){
        clearTimeout(wordRevealTimer);
        hero.style.setProperty("--word-reveal-x",`${x}px`);
        hero.style.setProperty("--word-reveal-y",`${y}px`);
        hero.classList.add("is-word-reveal");
    }

    function hideHeroWordsLater(){
        clearTimeout(wordRevealTimer);
        wordRevealTimer=setTimeout(()=>hero.classList.remove("is-word-reveal"),WORD_REVEAL_TIME);
    }

    function deflectHeroWords(x,y,rect,force=1,radius=650){
        hero.querySelectorAll(".hero-word-inner").forEach(word=>{
            const interruptions=Number(word.dataset.interruptions||0);
            if(interruptions>=5) return;

            const wordRect=word.getBoundingClientRect();
            const wordX=wordRect.left+wordRect.width/2-rect.left;
            const wordY=wordRect.top+wordRect.height/2-rect.top;
            const dx=wordX-x,dy=wordY-y;
            const distance=Math.hypot(dx,dy);

            if(distance>radius) return;

            const strength=1-distance/radius;
            if(strength<.12) return;

            let directionY=distance ? dy/distance : (wordY<rect.height/2 ? -1 : 1);
            if(Math.abs(directionY)<.2) directionY=(wordY<=y ? -1 : 1)*.2;

            const current=Number(word.dataset.driftY||0);
            const parentRect=word.parentElement.getBoundingClientRect();
            const baseTop=parentRect.top-rect.top;
            const minY=35-baseTop;
            const maxY=rect.height-35-baseTop-wordRect.height;
            const next=Math.max(minY,Math.min(maxY,current+directionY*120*strength*force));

            if(Math.abs(next-current)<4) return;

            word.dataset.driftY=next;
            word.dataset.interruptions=interruptions+1;
            word.style.setProperty("--word-drift-y",`${next}px`);
        });
    }

    function resetHeroWordRoute(word,randomizePosition=false){
        const inner=word.querySelector(".hero-word-inner");
        if(!inner) return;

        inner.dataset.interruptions="0";
        inner.dataset.driftY="0";
        inner.style.setProperty("--word-drift-y","0px");

        if(randomizePosition){
            const previous=Number.parseFloat(word.style.getPropertyValue("--y"))||50;
            let next=previous;

            for(let i=0;i<8 && Math.abs(next-previous)<12;i++){
                next=7+Math.random()*86;
            }

            word.style.setProperty("--y",`${next.toFixed(1)}%`);
        }
    }

    hero.querySelectorAll(".hero-word").forEach(word=>{
        resetHeroWordRoute(word);

        word.addEventListener("animationiteration",()=>{
            resetHeroWordRoute(word,true);
        });
    });

    /* ======================================
        CREAR ONDA GRANDE
    ====================================== */

    function createHeroRipple(
        x,
        y
    ){

        /*
        Nunca permitir más de
        dos ondas visibles.
        */

        const activeRipples =
            hero.querySelectorAll(
                ".hero-ripple"
            );


        if (activeRipples.length >= 2) {

            activeRipples[0].remove();

        }


        const ripple =
            document.createElement("div");


        ripple.classList.add(
            "hero-ripple"
        );


        ripple.style.left =
            `${x}px`;

        ripple.style.top =
            `${y}px`;


        ripple.innerHTML = `
            <span class="hero-ripple-core"></span>
            <span class="hero-ripple-ring ring-1"></span>
            <span class="hero-ripple-ring ring-2"></span>
            <span class="hero-ripple-ring ring-3"></span>
        `;


        hero.appendChild(ripple);


        setTimeout(() => {

            ripple.remove();

        }, 3800);

    }

    /* ======================================
    REACCIÓN AL IMPACTO
    ====================================== */

    function createImpact(x,y,rect){
        createHeroRipple(x,y);
        revealHeroWords(x,y);

        hero.querySelectorAll(".hero-text > *").forEach(element=>{
            distortHeroElement(element,x,y,rect);
        });

        deflectHeroWords(x,y,rect);
    }

    /* ======================================
    IMPACTO CON COOLDOWN
    ====================================== */

    function tryCreateImpact(x,y,rect){
        if(rippleCooldown) return;

        createImpact(x,y,rect);
        rippleCharges--;

        if(rippleCharges<=0){
            rippleCooldown=true;

            setTimeout(()=>{
                rippleCharges=2;
                rippleCooldown=false;
            },RIPPLE_COOLDOWN);
        }
    }

    /* ======================================
        CREAR ESTELA
    ====================================== */

    function createHoldTrail(
        x,
        y
    ){

        const trail =
            document.createElement("div");

        trail.classList.add(
            "hero-hold-trail"
        );


        trail.style.left =
            `${x}px`;

        trail.style.top =
            `${y}px`;


        hero.appendChild(
            trail
        );


        /* Evitar demasiados elementos */

        const trails =
            hero.querySelectorAll(
                ".hero-hold-trail"
            );

        if (trails.length > 16) {

            trails[0].remove();

        }


        setTimeout(() => {

            trail.remove();

        }, 800);

    }

    /* ======================================
    PRESIONAR
    ====================================== */

    hero.addEventListener("pointerdown",(event)=>{
        if(prefersReducedMotion.matches) return;
        if(event.button!==0) return;

        event.preventDefault();

        const rect=hero.getBoundingClientRect();
        const x=event.clientX-rect.left;
        const y=event.clientY-rect.top;

        tryCreateImpact(x,y,rect);

        isHolding=true;
        activePointerId=event.pointerId;
        hero.classList.add("is-holding");

        lastHoldTrailX=x;
        lastHoldTrailY=y;

        holdEffect=document.createElement("div");
        holdEffect.classList.add("hero-hold-effect");
        holdEffect.style.left=`${x}px`;
        holdEffect.style.top=`${y}px`;

        hero.appendChild(holdEffect);
        hero.setPointerCapture(event.pointerId);
    });

    /* ======================================
       MANTENER PRESIONADO + MOVER
    ====================================== */

    hero.addEventListener("pointermove", (event) => {

        if (!isHolding || event.pointerId !== activePointerId || !holdEffect) {return;}

        const rect = hero.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        holdEffect.style.left = `${x}px`;
        holdEffect.style.top = `${y}px`;

        revealHeroWords(x,y);

        const trailDistance = Math.hypot(x - lastHoldTrailX, y - lastHoldTrailY);

        if(trailDistance>=HOLD_TRAIL_DISTANCE){
            createHoldTrail(x,y);
            deflectHeroWords(x,y,rect,.35,240);
            lastHoldTrailX=x;
            lastHoldTrailY=y;
        }
    });

    /* ======================================
       SOLTAR
    ====================================== */

    function stopHeroHold(event){

        if (
            event.pointerId !== activePointerId
        ) {
            return;
        }


        const rect =
            hero.getBoundingClientRect();

        const x =
            Math.max(
                0,
                Math.min(
                    event.clientX - rect.left,
                    rect.width
                )
            );

        const y =
            Math.max(
                0,
                Math.min(
                    event.clientY - rect.top,
                    rect.height
                )
            );


        /* Segunda onda al soltar */

        tryCreateImpact(
            x,
            y,
            rect
        );


        isHolding = false;
        hero.classList.remove("is-holding");
        hideHeroWordsLater();

        if (holdEffect) {

            holdEffect.classList.add(
                "is-leaving"
            );

            const effectToRemove =
                holdEffect;

            setTimeout(() => {

                effectToRemove.remove();

            }, 350);

            holdEffect = null;

        }


        if (
            hero.hasPointerCapture(
                event.pointerId
            )
        ) {

            hero.releasePointerCapture(
                event.pointerId
            );

        }


        activePointerId = null;

    }

    hero.addEventListener("pointerup", stopHeroHold);
    hero.addEventListener("pointercancel", stopHeroHold);

    /* ======================================
    PAUSA DEL FONDO FUERA DE PANTALLA
    ====================================== */

    let heroIsVisible = true;

    /* ======================================
    ACTUALIZAR ESTADO
    ====================================== */

    function updateHeroAnimationState(){hero.classList.toggle("is-paused", !heroIsVisible || document.hidden);}

    /* ======================================
    DETECTAR VISIBILIDAD DEL HERO
    ====================================== */

    const heroVisibilityObserver = new IntersectionObserver(
        entries => { entries.forEach(
            entry => {heroIsVisible = entry.isIntersecting; updateHeroAnimationState();}
        );},
        {threshold:0}
    );

    heroVisibilityObserver.observe(hero);

    /* ======================================
    DETECTAR CAMBIO DE PESTAÑA
    ====================================== */

    document.addEventListener("visibilitychange", updateHeroAnimationState);

}

/* ==========================================
   APARICIÓN DE LA NAVEGACIÓN
========================================== */

const siteNav = document.querySelector(".site-nav");
const pageHero = document.querySelector(".hero");

if (siteNav) {

    function updateNavigation(){

        /* Si esta página tiene Hero,
           la navegación aparece al terminarlo */

        if (pageHero) {

            const heroBottom =
                pageHero.getBoundingClientRect().bottom;

            if (heroBottom <= 80) {

                siteNav.classList.add("is-visible");

            } else {

                siteNav.classList.remove("is-visible");

            }

        }

        /* En páginas sin Hero,
           la navegación queda visible */

        else {

            siteNav.classList.add("is-visible");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavigation,
        { passive:true }
    );


    updateNavigation();

}

/* ==========================================
   WIKI CASIOPEA — CAMPO ESTELAR
========================================== */

const wikiCard = document.getElementById("wiki");

if (wikiCard) {
    const wikiSpace = wikiCard.querySelector(".wiki-space");

    /* ======================================
       CREAR CAMPO DE ESTRELLAS
    ====================================== */

    function createWikiStars(){
        if (!wikiSpace) {return;}

        /*
        Limpiar estrellas anteriores
        para generar un cielo diferente
        cada vez.
        */

        wikiSpace.innerHTML = "";

        const starAmount = 105;


        for (
            let i = 0;
            i < starAmount;
            i++
        ) {

            const star =
                document.createElement(
                    "span"
                );


            star.classList.add(
                "wiki-star"
            );


            /* ==================================
               POSICIÓN ALEATORIA
            ================================== */

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;


            /* ==================================
               TAMAÑO
            ================================== */

            const randomSize = 1 + Math.random() * 2.3;
            star.style.setProperty("--star-size", `${randomSize}px`);

            /* ==================================
               BRILLO
            ================================== */

            const brightness = .35 + Math.random() * .65;
            star.style.setProperty("--star-opacity", brightness);

            /*
            Algunas estrellas se ven
            ligeramente más luminosas.
            */

            if (Math.random() > .84) {
                star.classList.add("is-bright");
                star.style.setProperty("--star-glow",`${6 + Math.random() * 6}px`);
            }

            /* ==================================
               VELOCIDAD DE PARPADEO
            ================================== */

            star.style.setProperty("--star-duration", `${1.8 + Math.random() * 4.2}s`);

            /*
            Delay negativo:
            hace que cada estrella comience
            en un punto diferente de su
            animación.
            */

            star.style.animationDelay =`${-Math.random() * 5}s`;
            wikiSpace.appendChild(star);

        }
    }

    /* ======================================
       ACTIVAR AL ENTRAR
    ====================================== */

    wikiCard.addEventListener("mouseenter", () => {createWikiStars();});

    /* ======================================
       LIMPIAR AL SALIR
    ====================================== */

    wikiCard.addEventListener("mouseleave",
        () => {
            setTimeout(() => {
                if (!wikiCard.matches(":hover")){wikiSpace.innerHTML = "";}}, 450);
        }
    );
}