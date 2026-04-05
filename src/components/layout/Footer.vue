<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container-padding py-12 lg:py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img src="/images/DRIVEELITE.png" alt="DriveElite" class="h-12 w-auto object-contain" />
            <span class="text-xl font-bold text-white">
              Drive<span class="text-primary-400">Elite</span>
            </span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Premium car rental service with a fleet of luxury vehicles. Experience the joy of driving with DriveElite.
          </p>
          <div class="flex gap-4 mt-6">
            <a href="#" class="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-80">
              <img src="/images/facebook.png" alt="Facebook" class="w-6 h-6 object-contain" />
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-80">
              <img src="/images/twitter.png" alt="Twitter" class="w-6 h-6 object-contain" />
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-80">
              <img src="/images/instagram.png" alt="Instagram" class="w-6 h-6 object-contain" />
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-80">
              <img src="/images/tik-tok.png" alt="TikTok" class="w-5 h-5 object-contain" />
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-80">
              <img src="/images/youtube.png" alt="YouTube" class="w-6 h-6 object-contain" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-3">
            <li>
              <router-link to="/" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <Home class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>Home</span>
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <Users class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>About Us</span>
              </router-link>
            </li>
            <li>
              <router-link to="/cars" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <Car class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>Browse Cars</span>
              </router-link>
            </li>
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <Send class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-white font-semibold mb-4">Support</h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <HelpCircle class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>Help Center</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <MessageCircle class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>FAQs</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <FileText class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>Rental Agreement</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <ShieldCheck class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>Insurance Policy</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal & Payments -->
        <div>
          <h3 class="text-white font-semibold mb-4">Legal & Payments</h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <Scale class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>Terms of Service</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <Lock class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>Privacy Policy</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-primary-400 transition-colors text-sm group">
                <Cookie class="w-4 h-4 text-gray-500 group-hover:text-primary-400 shrink-0" />
                <span>Cookie Policy</span>
              </a>
            </li>
          </ul>

          <!-- Payment Methods -->
          <div class="mt-5">
            <p class="text-xs text-gray-500 mb-3">We Accept</p>
            <div class="flex gap-3 flex-wrap items-center">
              <img src="/images/Mpesa-Logo.png" alt="M-Pesa" class="h-6 object-contain rounded" />
              <img src="/images/Visa.png" alt="Visa" class="h-6 object-contain rounded" />
              <img src="/images/mastercard.png" alt="Mastercard" class="h-6 object-contain rounded" />
              <img src="/images/Airtel-Money-Logo-Vector-PNG.png" alt="Airtel Money" class="h-6 object-contain rounded" />
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-semibold mb-4">Contact Us</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3 text-sm">
              <MapPin class="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <span>Westlands Road, Nairobi, Kenya</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <Phone class="w-5 h-5 text-primary-400 shrink-0" />
              <span>+254 700 123 456</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <Mail class="w-5 h-5 text-primary-400 shrink-0" />
              <span>support@driveelite.co.ke</span>
            </li>
            <li class="flex items-center gap-3 text-sm">
              <Clock class="w-5 h-5 text-primary-400 shrink-0" />
              <span>Mon–Sun: 7AM – 9PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-500">
          © {{ new Date().getFullYear() }} DriveElite. All rights reserved.
        </p>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-1.5 text-sm text-gray-500">
            <span>Built with</span>
            <span class="text-red-500 inline-block animate-pulse">❤️</span>
            <span>&</span>
            <span>code</span>
            <span class="font-mono text-primary-400">&lt;/&gt;</span>
            <span>by</span>
            <a href="https://marsden-maima-portfolio-1amlonewolfs-projects.vercel.app/" target="_blank" rel="noopener noreferrer" class="font-semibold text-gray-400 hover:text-primary-400 transition-colors">1amlonewolf</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Car, MapPin, Phone, Mail, Clock, Home, Users, Send, HelpCircle, MessageCircle, FileText, ShieldCheck, Scale, Lock, Cookie } from 'lucide-vue-next'
</script>
