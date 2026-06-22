(function () {
    function getVariant() {
        if (window.SITE_VARIANT) return window.SITE_VARIANT;
        var params = new URLSearchParams(window.location.search);
        var fromUrl = params.get('v');
        if (fromUrl === 'premium' || fromUrl === 'geral') return fromUrl;
        if (window.location.pathname.includes('premium')) return 'premium';
        return (window.SITE_CONFIG && window.SITE_CONFIG.defaultVariant) || 'geral';
    }

    function setText(el, html) {
        if (el) el.innerHTML = html;
    }

    function setAttr(el, attr, value) {
        if (el) el.setAttribute(attr, value);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var config = window.SITE_CONFIG;
        if (!config || !config.variants) return;

        var variant = getVariant();
        var data = config.variants[variant] || config.variants.geral;
        document.documentElement.setAttribute('data-variant', variant);

        setAttr(document.querySelector('meta[name="description"]'), 'content', data.metaDescription);

        setText(document.getElementById('hero-tagline'), data.heroTagline);
        setText(document.getElementById('hero-title'), data.heroTitle);
        setText(document.getElementById('hero-subtitle'), data.heroSubtitle);
        setText(document.getElementById('hero-text'), data.heroText);

        var hero = document.getElementById('hero');
        if (hero && data.heroImage) hero.style.backgroundImage = "url('" + data.heroImage + "')";

        setText(document.getElementById('importados-title'), data.importadosTitle);
        setText(document.getElementById('importados-heading'), data.importadosHeading);
        setText(document.getElementById('importados-text-1'), data.importadosText1);
        setText(document.getElementById('importados-text-2'), data.importadosText2);

        var importadosImg = document.getElementById('importados-image');
        if (importadosImg && data.importadosImage) {
            importadosImg.style.backgroundImage = "url('" + data.importadosImage + "')";
            setAttr(importadosImg, 'aria-label', data.importadosImageAlt);
        }

        var importadosCta = document.getElementById('importados-cta');
        if (importadosCta) {
            importadosCta.textContent = '';
            importadosCta.appendChild(document.createTextNode(data.importadosCta + ' '));
            var icon = document.createElement('i');
            icon.className = 'fa-brands fa-whatsapp ml-2';
            importadosCta.appendChild(icon);
            importadosCta.href = 'https://wa.me/5541987065961?text=' + encodeURIComponent(
                'Olá, estou entrando em contato através do site Agis Car Service Loja Batel, ' + data.importadosWa
            );
        }

        var list = document.getElementById('importados-list');
        if (list && data.importadosList) {
            list.innerHTML = data.importadosList.map(function (item) {
                return '<li class="flex items-start gap-2"><i class="fa-solid fa-check text-gold mt-0.5"></i> ' + item + '</li>';
            }).join('');
        }

        setText(document.getElementById('diferencial-2-title'), data.diferencial2Title);
        setText(document.getElementById('diferencial-2-text'), data.diferencial2Text);
        setText(document.getElementById('footer-tagline'), data.footerTagline);

        if (data.gallery) {
            document.querySelectorAll('[data-gallery-index]').forEach(function (el) {
                var idx = parseInt(el.getAttribute('data-gallery-index'), 10);
                if (data.gallery[idx]) el.style.backgroundImage = "url('" + data.gallery[idx] + "')";
            });
        }
    });
})();
