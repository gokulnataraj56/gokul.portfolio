import React, { useState, useEffect, useRef } from 'react';
import profilePic from "./assets/profile.jpg";
// To use your photo, create an 'assets' folder in 'src', add 'profile.jpg', 
// and uncomment the line below.
// import profilePic from "./assets/profile.jpg";

// --- SVG Icons as Components ---
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3">
    <path d="M9 19c-4.3 1.4 -4.3-2.5 -6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.1 0-1.3-.5-2.4-1.2-3.2.1-.3.5-1.5-.1-3.2 0 0-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1c-.6 1.7-.2 2.9-.1 3.2-.7.8-1.2 1.9-1.2 3.2 0 4.6 2.7 5.7 5.5 6.1-.6.5-.9 1.2-.9 2.3V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

// --- Background Animation Component ---
const BackgroundAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particlesArray;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        const init = () => {
            particlesArray = [];
            const numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                const size = (Math.random() * 2) + 1;
                const x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                const y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                const directionX = (Math.random() * .4) - .2;
                const directionY = (Math.random() * .4) - .2;
                const color = 'rgba(150, 150, 150, 0.5)';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(120, 120, 120, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        };

        setCanvasSize();
        init();
        animate();

        window.addEventListener('resize', () => {
            setCanvasSize();
            init();
        });

        return () => window.removeEventListener('resize', () => {
            setCanvasSize();
            init();
        });
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>;
};


// --- Reusable Animated Component ---
const AnimatedSection = ({ children, className = '' }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={sectionRef} 
            className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </div>
    );
};


// --- Header Component ---
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#about', label: 'About Me' },
        { href: '#projects', label: 'Projects' },
        { href: '#connect', label: 'Connect' },
        { href: '#contact', label: 'Contact' }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto max-w-7xl px-6 lg:px-8 py-4 flex justify-between items-center">
                <a href="#home" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">Port Folio</a>
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-lg">
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

// --- Hero Section ---
const Hero = () => (
    <section id="home" className="relative min-h-screen flex items-center bg-gray-50 overflow-hidden">
        <BackgroundAnimation />
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 py-16 relative z-10">
            <AnimatedSection className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center md:justify-end md:pr-8">
                    <div className="w-64 h-64 rounded-full shadow-lg overflow-hidden border-4 border-white/30 backdrop-blur-sm">
                        {/* Once you add your image and uncomment the import, change the src to `src={profilePic}` */}
                        <img src={profilePic} alt="Gokul N" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="text-center md:text-left mt-8 md:mt-0">
                    <h2 className="text-5xl lg:text-7xl font-extrabold text-gray-800 tracking-tight">Gokul. N</h2>
                    <p className="mt-4 text-xl lg:text-2xl text-gray-600">Junior Web Developer</p>
                    <p className="mt-2 text-md lg:text-lg text-gray-500">Student at BCA, Nehru Arts And Science College</p>
                </div>
            </AnimatedSection>
        </div>
    </section>
);

// --- About Section ---
const About = () => {
    const ReactLogo = () => (
        <svg className="h-16 w-16 text-sky-500" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
            <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"></ellipse>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
            </g>
        </svg>
    );

    const JavascriptLogo = () => (
        <svg className="h-16 w-16" viewBox="0 0 128 128">
            <rect width="128" height="128" fill="#F7DF1E"></rect>
            <path d="M60.26 91.562c1.563 2.531 3.75 4.312 6.5 5.312 2.75 1 5.75 1.5 9 1.5 3.313 0 6.313-.563 9-1.688 2.688-1.125 4.938-2.875 6.688-5.25 1.75-2.375 2.625-5.125 2.625-8.25 0-2.813-.563-5.25-1.688-7.313-1.125-2.063-2.813-3.75-5.063-5.063-2.25-1.313-4.938-2.25-8.063-2.813-3.125-.563-6.563-1.125-10.313-1.688-4.938-.688-8.875-1.563-11.813-2.625-2.938-1.063-5.188-2.563-6.75-4.5-1.563-1.938-2.344-4.375-2.344-7.313 0-2.563.625-4.875 1.875-6.938 1.25-2.063 3.063-3.75 5.438-5.063 2.375-1.312 5.125-1.968 8.25-1.968 3.688 0 7.063.813 10.125 2.438 3.063 1.625 5.563 3.938 7.5 7 1.813 2.875 2.813 6.125 3 9.75h-15.125c-.25-2.5-.938-4.5-2.063-6-1.125-1.5-2.688-2.25-4.688-2.25-1.813 0-3.313.563-4.5 1.688-1.188 1.125-1.781 2.5-1.781 4.125 0 2.188.625 4 1.875 5.438 1.25 1.437 3.188 2.687 5.813 3.75 2.625 1.062 5.938 1.875 10 2.437 4.938.688 8.938 1.563 12 2.625 3.063 1.063 5.438 2.563 7.125 4.5 1.688 1.938 2.531 4.375 2.531 7.313 0 3.375-.813 6.375-2.438 9-1.625 2.625-3.875 4.625-6.75 6-2.875 1.375-6.125 2.063-9.75 2.063-4.125 0-7.875-.875-11.25-2.625-3.375-1.75-6.063-4.25-8.063-7.5l-1.438-2.563zM40.25 93h15.25v-52H40.25v52z" fill="#000"></path>
        </svg>
    );

    const ExpressLogo = () => (
       <svg className="h-16 w-16 text-gray-800" fill="currentColor" viewBox="0 0 100 100">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="50" fontWeight="bold">ex</text>
       </svg>
    );

    const MongoDbLogo = () => (
         <svg className="h-16 w-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.11,11.1C15.2,10.19,13.7,10.33,13,10.61C12.95,10.11,12.86,9.62,12.74,9.14C12.39,7.63,11.5,6.22,10.11,5.65C8.68,5.07,7,5.43,6.1,6.39C5.17,7.36,5,8.96,5.67,10.41C6.34,11.86,7.74,12.74,9.25,12.74C9.73,12.74,10.21,12.65,10.67,12.47C10.96,13.17,11.1,14.67,10.19,15.58C9.27,16.5,7.77,16.36,7.5,15.68C7,15.73,6.5,15.82,6.03,15.94C4.5,16.3,3.09,17.19,2.5,18.59C1.92,20,2.27,21.65,3.23,22.56C4.19,23.49,5.8,23.68,7.25,23.01C8.7,22.34,9.59,20.94,9.59,19.43C9.59,18.96,9.5,18.49,9.32,18.03C10.03,18.3,11.53,18.44,12.44,17.53C13.88,16.09,13.5,13.6,13.26,12.97C13.65,12.8,15.3,12.11,16.11,11.1M13,11.61C12.33,12.28,11.64,12.74,10.67,12.47C10.21,12.65,9.73,12.74,9.25,12.74C7.74,12.74,6.34,11.86,5.67,10.41C5,8.96,5.17,7.36,6.1,6.39C7,5.43,8.68,5.07,10.11,5.65C11.5,6.22,12.39,7.63,12.74,9.14C12.79,9.37,12.82,9.61,12.85,9.85C14.15,9.5,14.9,10.03,15.14,10.27C15.5,10.63,15.5,11.24,15.14,11.61C14.78,11.96,14.17,11.96,13.82,11.61C13.56,11.35,13.22,11.45,13,11.61M7.5,15.68C7.77,16.36,8.8,16.03,10.19,15.58C11.1,14.67,10.96,13.17,10.67,12.47C10.92,12.69,11.34,13.2,11.41,14.16C11.47,15.05,11,15.77,10.5,16.14C10.13,16.41,8.39,17.2,7.5,15.68M7.25,23.01C5.8,23.68,4.19,23.49,3.23,22.56C2.27,21.65,1.92,20,2.5,18.59C3.09,17.19,4.5,16.3,6.03,15.94C7.47,15.6,9.1,15.79,10.06,16.71C10.31,16.44,10.44,16.21,10.5,16.14C10.74,15.89,11.05,16.03,11.41,16.16C11.16,17.47,10.3,18.66,9.59,19.43C9.59,20.94,8.7,22.34,7.25,23.01Z"></path>
        </svg>
    );

    const technologies = [
        { name: 'React', logo: <ReactLogo /> },
        { name: 'JavaScript', logo: <JavascriptLogo /> },
        { name: 'Express.js', logo: <ExpressLogo /> },
        { name: 'MongoDB', logo: <MongoDbLogo /> },
    ];

    return (
        <section id="about" className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-800">About Me</h2>
                    <div className="w-24 h-1.5 bg-blue-500 mx-auto mb-12"></div>
                    <p className="max-w-3xl lg:max-w-4xl mx-auto text-lg lg:text-xl text-gray-600 leading-relaxed text-center">
                        Passionate and aspiring junior Full-Stack Developer with a handful in HTML, CSS, JavaScript, React.js, Node.js, and MongoDB. Skilled in building responsive, user-friendly applications and transforming static designs into dynamic, functional web solutions.
                        <br/><br/>
                        Experienced in creating practical projects like medical billing systems, nurse management dashboards, and admin panels, integrating both front-end and back-end workflows. Proficient in designing intuitive UIs, handling data storage with MongoDB/Excel, and developing secure authentication systems.
                        <br/><br/>
                        Strong interest in problem-solving, scalable application development, and modern web technologies. Currently focused on enhancing skills in React, Node.js, and full-stack development to deliver impactful digital solutions.
                        Always eager to collaborate, learn, and contribute to projects that make a real-world impact.
                    </p>
                    <div className="mt-16">
                         <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-10">
                            {technologies.map(({ name, logo }) => (
                                <div key={name} className="flex flex-col items-center gap-2 text-gray-600 font-medium transition-transform hover:scale-110">
                                    {logo}
                                    <span>{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};




// --- Connect Section ---
const Connect = () => {
    const socialLinks = [
        { Icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile', download: false },
        { Icon: GithubIcon, label: 'GitHub', href: 'https://github.com/gokulnataraj56', download: false },
        { Icon: GmailIcon, label: 'Gmail', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=gokulnataraj.dev@gmail.com', download: false },
        { Icon: DownloadIcon, label: 'Resume', href: '/resume.pdf', download: true },
    ];

    return (
        <section id="connect" className="py-20 lg:py-28 bg-gray-50">
            <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-800">Connect</h2>
                    <div className="w-24 h-1.5 bg-blue-500 mx-auto mb-12"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {socialLinks.map(({ Icon, label, href, download }) => (
                            <a 
                                key={label} 
                                href={href} 
                                download={download}
                                target={!download ? '_blank' : '_self'}
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center w-full px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-blue-500 hover:text-white transform hover:-translate-y-1 transition-all duration-300 text-lg"
                            >
                                <Icon />
                                {label}
                            </a>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

// --- Projects Section ---
const Projects = () => {
    return (
        <section id="projects" className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-800">Projects</h2>
                    <div className="w-24 h-1.5 bg-blue-500 mx-auto mb-12"></div>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full">
                           <h3 className="text-2xl font-bold text-gray-800 mb-2">Project Summary</h3>
                           <p className="text-gray-600 leading-relaxed">
                               Clinice Pro is a clinic management solution designed for small and start-up clinics to simplify day-to-day operations. Unlike costly hospital-focused systems, it offers a one-time purchase, lifetime use model, integrating patient records, doctor consultations, billing, and stock management into a seamless workflow. With Excel-based lightweight data storage, automated billing tied to prescriptions and inventory, and complete patient history tracking, Clinice Pro ensures efficiency and better patient care. Built using React (frontend) and Node.js + Express (backend), the system is currently at the prototype stage, aiming to make healthcare management smarter, simpler, and more affordable.
                           </p>
                        </div>
                        <div className="w-full h-[500px] lg:h-full mt-12 lg:mt-0">
                            <iframe 
                                src="/resume.pdf" 
                                title="Gokul N Resume" 
                                className="w-full h-full border-2 border-gray-200 rounded-lg shadow-lg"
                            ></iframe>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
            
        </section>
    );
};

// --- Contact Section ---
const Contact = () => {
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        message: '',
        access_key: '3d64c552-0cb4-4277-a096-95c64d750eaf' // IMPORTANT: Replace with your actual key
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.success) {
                setStatus('Message Sent Successfully!');
                // Clear form fields after success, but keep access key
                setFormData({
                    ...formData,
                    name: '',
                    whatsapp: '',
                    message: ''
                });
            } else {
                console.error("Error from Web3Forms:", result);
                setStatus('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('An error occurred. Please try again later.');
        }

        setTimeout(() => {
            setStatus('');
        }, 5000); // Message disappears after 5 seconds
    };

    return (
        <section id="contact" className="py-20 lg:py-28 bg-blue-50">
            <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-800">Message Me</h2>
                    <div className="w-24 h-1.5 bg-blue-500 mx-auto mb-12"></div>
                    <div className="max-w-lg mx-auto bg-white p-8 lg:p-12 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-lg" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="whatsapp" className="block text-gray-700 font-medium mb-2">WhatsApp</label>
                                <input type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-lg" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-lg"></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg">
                                    {status === 'Sending...' ? 'Sending...' : 'Submit'}
                                </button>
                            </div>
                            {status && <p className={`mt-4 text-center ${status.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>{status}</p>}
                        </form>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

// --- Footer Component ---
const Footer = () => (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} Gokul N. All Rights Reserved.</p>
        </div>
    </footer>
);


// --- Main App Component ---
export default function App() {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div className="font-sans text-gray-800 antialiased">
            <Header />
            <main>
                <Hero />
                <About />
                <Projects />
                <Connect />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

