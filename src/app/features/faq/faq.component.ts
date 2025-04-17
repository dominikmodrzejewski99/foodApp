import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    CardModule,
    ButtonModule
  ]
})
export class FaqComponent {
  faqItems: FaqItem[] = [
    {
      question: 'Jak działa system rekomendacji restauracji?',
      answer: 'Nasz system rekomendacji analizuje Twoje odpowiedzi na pytania dotyczące preferencji kulinarnych, budżetu, lokalizacji i innych czynników. Na podstawie tych informacji, algorytm dopasowuje restauracje, które najlepiej odpowiadają Twoim potrzebom, przyznając każdej z nich wynik dopasowania. Restauracje z najwyższym wynikiem są prezentowane jako najlepsze rekomendacje.',
      category: 'Rekomendacje'
    },
    {
      question: 'Czy mogę zmienić swoje odpowiedzi po zakończeniu quizu?',
      answer: 'Tak, możesz w każdej chwili wrócić do quizu i zmienić swoje odpowiedzi, klikając przycisk "Rozpocznij od nowa". System wygeneruje nowe rekomendacje na podstawie zaktualizowanych preferencji.',
      category: 'Quiz'
    },
    {
      question: 'Skąd pochodzą dane o restauracjach?',
      answer: 'Dane o restauracjach pochodzą z naszej własnej bazy danych, która jest regularnie aktualizowana. Informacje obejmują lokalizację, menu, ceny, godziny otwarcia oraz opinie klientów. Współpracujemy również z właścicielami restauracji, aby zapewnić jak najbardziej aktualne informacje.',
      category: 'Dane'
    },
    {
      question: 'Czy aplikacja uwzględnia specjalne diety i alergie?',
      answer: 'Tak, nasz quiz zawiera pytania dotyczące diet specjalnych (wegetariańska, wegańska, bezglutenowa) oraz alergii pokarmowych. Na podstawie tych informacji, system rekomenduje restauracje, które oferują odpowiednie opcje menu.',
      category: 'Preferencje'
    },
    {
      question: 'Jak często aktualizowane są rekomendacje?',
      answer: 'Rekomendacje są generowane w czasie rzeczywistym na podstawie Twoich odpowiedzi. Za każdym razem, gdy wypełniasz quiz, otrzymujesz świeże rekomendacje. Nasza baza danych restauracji jest aktualizowana codziennie, aby uwzględnić nowe lokale, zmiany w menu czy cenach.',
      category: 'Rekomendacje'
    },
    {
      question: 'Czy mogę zapisać swoje ulubione rekomendacje?',
      answer: 'Obecnie pracujemy nad funkcją zapisywania ulubionych rekomendacji. W przyszłej aktualizacji będzie możliwe tworzenie listy ulubionych restauracji oraz udostępnianie rekomendacji znajomym.',
      category: 'Funkcje'
    },
    {
      question: 'Jak zgłosić błąd w informacjach o restauracji?',
      answer: 'Jeśli zauważysz nieścisłości w informacjach o restauracji, możesz zgłosić to poprzez formularz kontaktowy dostępny w sekcji "O nas". Nasz zespół zweryfikuje zgłoszenie i wprowadzi niezbędne poprawki.',
      category: 'Dane'
    },
    {
      question: 'Czy aplikacja uwzględnia aktualną lokalizację użytkownika?',
      answer: 'Obecnie nie, ale planujemy wprowadzić tę funkcję w przyszłości. Na razie aplikacja obejmuje tylko restauracje we Wrocławiu. W kolejnych aktualizacjach dodamy możliwość automatycznego wykrywania lokalizacji użytkownika oraz ręcznego wprowadzania preferowanej lokalizacji lub dzielnicy miasta.',
      category: 'Funkcje'
    },
    {
      question: 'Jak działa ocena dopasowania restauracji?',
      answer: 'Ocena dopasowania (match score) jest wyrażona w procentach i pokazuje, jak dobrze dana restauracja odpowiada Twoim preferencjom. Im wyższy procent, tym lepsze dopasowanie. Ocena uwzględnia wszystkie czynniki, takie jak typ kuchni, ceny, lokalizacja, oceny innych użytkowników i specjalne wymagania dietetyczne.',
      category: 'Rekomendacje'
    },
    {
      question: 'Czy mogę filtrować rekomendacje według określonych kryteriów?',
      answer: 'Obecnie rekomendacje są generowane na podstawie Twoich odpowiedzi w quizie. W przyszłych aktualizacjach planujemy dodać możliwość dodatkowego filtrowania wyników według kryteriów takich jak odległość, cena czy oceny użytkowników.',
      category: 'Funkcje'
    }
  ];

  // Grupowanie pytań według kategorii
  get groupedFaqItems(): { [key: string]: FaqItem[] } {
    return this.faqItems.reduce((groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {} as { [key: string]: FaqItem[] });
  }

  // Pobieranie unikalnych kategorii
  get categories(): string[] {
    return Object.keys(this.groupedFaqItems);
  }
}
