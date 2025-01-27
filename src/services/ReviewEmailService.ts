import { format, isYesterday } from "date-fns";

interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  date: Date;
  status: 'completed' | 'cancelled' | 'no-show';
  reviewEmailSent: boolean;
}

interface ReviewEmailTemplate {
  subject: string;
  body: string;
}

export class ReviewEmailService {
  private static generateReviewLink(reservationId: string): string {
    // Na implementação real, gerar um token único e seguro
    return `${window.location.origin}/review/${reservationId}`;
  }

  private static getEmailTemplate(reservation: Reservation): ReviewEmailTemplate {
    const reviewLink = this.generateReviewLink(reservation.id);
    
    return {
      subject: `Como foi sua experiência no restaurante?`,
      body: `
        Olá ${reservation.customerName},

        Esperamos que tenha aproveitado sua visita em ${format(reservation.date, "dd/MM/yyyy")}.
        
        Gostaríamos muito de saber sua opinião sobre a experiência.
        Por favor, clique no link abaixo para deixar sua avaliação:

        ${reviewLink}

        Sua opinião é muito importante para continuarmos melhorando nossos serviços.

        Atenciosamente,
        Equipe do Restaurante
      `
    };
  }

  public static async checkAndSendReviewEmails(): Promise<void> {
    try {
      // 1. Buscar todas as reservas do dia anterior
      const yesterdayReservations = await this.getYesterdayReservations();

      // 2. Filtrar reservas elegíveis para review
      const eligibleReservations = yesterdayReservations.filter(reservation => 
        reservation.status === 'completed' && !reservation.reviewEmailSent
      );

      // 3. Enviar emails para cada reserva elegível
      for (const reservation of eligibleReservations) {
        await this.sendReviewEmail(reservation);
      }

    } catch (error) {
      console.error('Erro ao processar emails de review:', error);
    }
  }

  private static async getYesterdayReservations(): Promise<Reservation[]> {
    // Implementar busca no banco de dados
    // Na implementação real, isso buscaria do seu backend
    return [];
  }

  private static async sendReviewEmail(reservation: Reservation): Promise<void> {
    try {
      const template = this.getEmailTemplate(reservation);
      
      // Implementar envio real do email
      // Na implementação real, usar serviço de email como SendGrid, AWS SES, etc.
      console.log(`Enviando email para ${reservation.customerEmail}:`, template);

      // Marcar email como enviado
      await this.markReviewEmailAsSent(reservation.id);

    } catch (error) {
      console.error(`Erro ao enviar email de review para reserva ${reservation.id}:`, error);
    }
  }

  private static async markReviewEmailAsSent(reservationId: string): Promise<void> {
    // Implementar atualização no banco de dados
    // Na implementação real, isso atualizaria seu backend
    console.log(`Marcando email como enviado para reserva ${reservationId}`);
  }
}

// Agendar verificação diária
// Na implementação real, usar um job scheduler como node-cron
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 12 && now.getMinutes() === 0) {
    ReviewEmailService.checkAndSendReviewEmails();
  }
}, 60000); // Verificar a cada minuto 