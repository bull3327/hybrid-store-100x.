'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimatePresence, motion } from 'framer-motion';

type Language = 'en' | 'es' | 'fr' | 'de';

const SUPPORT_LANGUAGES: Record<Language, { label: string; greeting: string; placeholder: string; thinking: string }> = {
    en: { label: 'English', greeting: 'Hello! I am the HybridStore Bot. How can I help you today?', placeholder: 'Type a message...', thinking: 'Thinking...' },
    es: { label: 'Español', greeting: '¡Hola! Soy el Bot de HybridStore. ¿En qué puedo ayudarte hoy?', placeholder: 'Escribe un mensaje...', thinking: 'Pensando...' },
    fr: { label: 'Français', greeting: 'Bonjour! Je suis le Bot HybridStore. Comment puis-je vous aider?', placeholder: 'Tapez un message...', thinking: 'Réflexion...' },
    de: { label: 'Deutsch', greeting: 'Hallo! Ich bin der HybridStore Bot. Wie kann ich Ihnen heute helfen?', placeholder: 'Nachricht eingeben...', thinking: 'Nachdenken...' }
};

const BOT_RESPONSES: Record<Language, Record<string, string>> = {
    en: {
        default: "I'm not sure about that, but our human team can help! Please email hybridstorehybridstore@gmail.com.",
        order: "You can track your order status in your account dashboard. Shipping usually takes 3-5 days.",
        shipping: "We offer worldwide shipping! Standard delivery is 3-5 business days.",
        return: "Returns are accepted within 30 days of purchase if the item is unused.",
        product: "Our products are curated for quality and innovation. Do you have a specific item in mind?"
    },
    es: {
        default: "No estoy seguro de eso, pero nuestro equipo humano puede ayudar. Envía un correo a hybridstorehybridstore@gmail.com.",
        order: "Puedes ver el estado de tu pedido en el panel de tu cuenta. El envío suele tardar 3-5 días.",
        shipping: "¡Ofrecemos envío mundial! La entrega estándar es de 3-5 días hábiles.",
        return: "Se aceptan devoluciones dentro de los 30 días posteriores a la compra si el artículo no se ha utilizado.",
        product: "Nuestros productos se seleccionan por su calidad e innovación. ¿Tienes un artículo específico en mente?"
    },
    fr: {
        default: "Je n'en suis pas sûr, mais notre équipe peut vous aider! Veuillez envoyer un e-mail à hybridstorehybridstore@gmail.com.",
        order: "Vous pouvez suivre votre commande dans votre tableau de bord. La livraison prend généralement 3-5 jours.",
        shipping: "Nous livrons dans le monde entier! La livraison standard est de 3-5 jours ouvrables.",
        return: "Les retours sont acceptés dans les 30 jours suivant l'achat si l'article n'est pas utilisé.",
        product: "Nos produits sont sélectionnés pour leur qualité et leur innovation."
    },
    de: {
        default: "Ich bin mir nicht sicher, aber unser Team kann helfen! Bitte senden Sie eine E-Mail an hybridstorehybridstore@gmail.com.",
        order: "Sie können Ihren Bestellstatus in Ihrem Konto-Dashboard verfolgen. Der Versand dauert in der Regel 3-5 Tage.",
        shipping: "Wir bieten weltweiten Versand! Die Standardlieferung beträgt 3-5 Werktage.",
        return: "Rücksendungen werden innerhalb von 30 Tagen nach dem Kauf akzeptiert, wenn der Artikel unbenutzt ist.",
        product: "Unsere Produkte werden nach Qualität und Innovation ausgewählt."
    }
};

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
};

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<Language>('en');
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate network delay / AI processing
        setTimeout(() => {
            const lowerText = userMsg.text.toLowerCase();
            let botText = BOT_RESPONSES[language].default;

            if (lowerText.includes('order') || lowerText.includes('track') || lowerText.includes('pedido') || lowerText.includes('commande') || lowerText.includes('bestellung')) {
                botText = BOT_RESPONSES[language].order;
            } else if (lowerText.includes('ship') || lowerText.includes('deliv') || lowerText.includes('envío') || lowerText.includes('livraison') || lowerText.includes('versand')) {
                botText = BOT_RESPONSES[language].shipping;
            } else if (lowerText.includes('return') || lowerText.includes('refund') || lowerText.includes('devolu') || lowerText.includes('retour') || lowerText.includes('rückgabe')) {
                botText = BOT_RESPONSES[language].return;
            } else if (lowerText.includes('product') || lowerText.includes('item') || lowerText.includes('producto') || lowerText.includes('produit') || lowerText.includes('produkt')) {
                botText = BOT_RESPONSES[language].product;
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setMessages([{
            id: 'init',
            text: SUPPORT_LANGUAGES[lang].greeting,
            sender: 'bot',
            timestamp: new Date()
        }]);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-20 right-4 w-[90vw] md:w-96 h-[500px] bg-card border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary rounded-full text-white">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">HybridBot</h3>
                                    <div className="flex items-center gap-1 text-xs text-green-500">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Online
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Language Selector (if no messages yet, or always accessible?) Let's put it on top if needed, but for now simple init */}
                        {messages.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4 text-center">
                                <Globe className="h-12 w-12 text-muted-foreground mb-2" />
                                <h4 className="font-bold">Select Language</h4>
                                <div className="grid grid-cols-2 gap-2 w-full">
                                    {(Object.keys(SUPPORT_LANGUAGES) as Language[]).map((lang) => (
                                        <Button key={lang} variant="outline" onClick={() => handleLanguageChange(lang)}>
                                            {SUPPORT_LANGUAGES[lang].label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chat Area */}
                        {messages.length > 0 && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                                    : 'bg-muted text-muted-foreground rounded-tl-sm'
                                                    }`}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-sm text-xs text-muted-foreground animate-pulse">
                                                {SUPPORT_LANGUAGES[language].thinking}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t border-white/5 bg-background/50 backdrop-blur-sm">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }}
                                        className="flex gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder={SUPPORT_LANGUAGES[language].placeholder}
                                            className="flex-1 bg-secondary/50 border-none rounded-full px-4 text-sm focus:ring-1 focus:ring-primary outline-none text-foreground placeholder:text-muted-foreground/50"
                                        />
                                        <Button type="submit" size="icon" className="rounded-full h-10 w-10 shrink-0" disabled={!inputValue.trim() || isTyping}>
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform z-40"
            >
                <MessageCircle className="h-6 w-6 text-white" />
            </Button>
        </>
    );
}
