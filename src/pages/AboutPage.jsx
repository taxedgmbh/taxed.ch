import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Award, Target, Heart, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const AboutPage = () => {
  const team = [
    {
      name: 'Emanuel Flury',
      role: 'Founder & Managing Director',
      description: 'Emanuel Flury is the Founder and Managing Director of Taxed GmbH. He is responsible for the overall management of the firm and advises clients in matters related to Swiss and international taxation, with a focus on expatriates. With a background in economics and finance, he ensures the firm\'s services are compliant, client-oriented, and up to date.',
      email: 'me@eflury.com',
      image: 'Professional headshot of Emanuel Flury, a man in business attire'
    },
    {
      name: 'Patricia Marie Fangon',
      role: 'Tax Consultant & Customer Service Specialist',
      description: 'Patricia Marie Fangon supports clients at Taxed GmbH in both tax matters and customer service. She helps manage client communication, documentation, and the preparation of tax-related information. Patricia is currently building her expertise in Swiss taxation, especially in the context of international clients.',
      email: 'patriciafangon@taxed.ch',
      image: 'Professional headshot of Patricia Marie Fangon, a woman with a friendly smile'
    },
    {
      name: 'Angela Samson',
      role: 'Tax Consultant & Research Specialist',
      description: 'Angela Samson is part of the Taxed GmbH team with a focus on tax research and support. She contributes to ensuring that the firm’s services are based on up-to-date Swiss and international tax regulations. Angela assists in the preparation of cases and background analyses for client inquiries.',
      email: 'angelasamson@taxed.ch',
      image: 'Professional headshot of Angela Samson, a woman in a professional setting'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Transparency',
      description: 'Clear, upfront pricing with no hidden fees or surprises. You know exactly what you pay.',
      color: 'bg-warm-red-tint text-brand-red'
    },
    {
      icon: Heart,
      title: 'Simplicity',
      description: 'We make complex Swiss tax laws simple and understandable for everyone.',
      color: 'bg-warm-red-tint text-steel-blue'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality service and expert guidance.',
      color: 'bg-warm-red-tint text-brand-red'
    },
    {
      icon: Users,
      title: 'Personal Touch',
      description: 'Every client receives personalized attention and tailored solutions.',
      color: 'bg-warm-red-tint text-steel-blue'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Taxed GmbH - Expert Swiss Tax Consulting Team</title>
        <meta name="description" content="Meet the expert team at Taxed GmbH. Founded by Emanuel Flury in Biel/Bienne, Switzerland, we specialize in making Swiss tax filing simple for expats." />
        <meta property="og:title" content="About Us | Taxed GmbH - Expert Swiss Tax Consulting Team" />
        <meta property="og:description" content="Meet the expert team at Taxed GmbH. Founded by Emanuel Flury in Biel/Bienne, Switzerland, we specialize in making Swiss tax filing simple for expats." />
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              About Taxed GmbH
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Based in Biel/Bienne, Switzerland, we're dedicated to making Swiss tax filing 
              simple, digital, and stress-free for expatriates and professionals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-dark-gray mb-6">
                "We make Swiss tax filing simple, digital, and stress-free — with no hidden costs."
              </p>
              <p className="text-dark-gray/80 mb-6">
                Founded with the vision of transforming how expatriates and professionals 
                handle their Swiss tax obligations, Taxed GmbH combines deep local expertise 
                with modern digital solutions.
              </p>
              <p className="text-dark-gray/80">
                Our transparent, flat-rate pricing model ensures you always know what you're 
                paying, while our bilingual team provides expert guidance in both German and English.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img  
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
                alt="Modern office in Biel/Bienne Switzerland"
               src="https://images.unsplash.com/photo-1695487562553-c71a77e6c656" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Our experienced professionals are dedicated to providing you with 
              the best possible tax consulting services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex"
              >
                <Card className="h-full w-full flex flex-col card-hover border-steel-blue/20 shadow-lg bg-white">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-brand-red">
                      <img 
                        className="w-full h-full object-cover"
                        alt={member.image}
                       src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{member.name}</CardTitle>
                    <CardDescription className="text-steel-blue font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-dark-gray/80 text-center text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto justify-center">
                     <a href={`mailto:${member.email}`} className="text-steel-blue hover:text-brand-red transition-colors flex items-center space-x-2 text-sm font-medium">
                        <Mail className="h-4 w-4" />
                        <span>{member.email}</span>
                      </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Our Values
            </h2>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we serve our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover border-steel-blue/20 shadow-lg text-center bg-white">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mx-auto mb-4`}>
                      <value.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-dark-gray/80">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 swiss-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Located in the Heart of Switzerland
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Based in Biel/Bienne, we're perfectly positioned to serve clients 
              throughout Switzerland with our bilingual expertise and local knowledge.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 glass-effect">
              <p className="text-lg text-white/80">
                <strong className="text-white">Taxed GmbH</strong><br />
                Biel/Bienne, Switzerland<br />
                📞 +41 79 910 77 87<br />
                ✉️ info@taxed.ch
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;