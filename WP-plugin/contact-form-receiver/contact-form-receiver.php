<?php
/*
Plugin Name: Contact Form Receiver
Description: Recibe datos de un formulario React y los guarda en la base de datos.
Version: 1.0
Author: Lucas Roqué
Author URI: http://nesmanpro.com/dev/
*/

register_activation_hook(__FILE__, 'cfr_create_table');

function cfr_create_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_form';
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        secondname varchar(255),
        email varchar(255) NOT NULL,
        phone varchar(50) NOT NULL,
        message text NOT NULL,
        date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}


add_action('rest_api_init', function () {
    register_rest_route('contact-form/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'cfr_receive_form',
        'permission_callback' => '__return_true'
    ));
});

function cfr_receive_form($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_form';

    $params = $request->get_json_params();

    if (!$params) {
        return [
            'success' => false,
            'message' => 'No se recibieron datos'
        ];
    }

    $name = sanitize_text_field($params['name'] ?? '');
    $secondname = sanitize_text_field($params['secondname'] ?? '');
    $email = sanitize_email($params['email'] ?? '');
    $phone = sanitize_text_field($params['phone'] ?? '');
    $message = sanitize_textarea_field($params['message'] ?? '');

    if (!$name || !$email || !$phone || !$message) {
        return [
            'success' => false,
            'message' => 'Faltan campos obligatorios'
        ];
    }

    $wpdb->insert($table_name, [
        'name' => $name,
        'secondname' => $secondname,
        'email' => $email,
        'phone' => $phone,
        'message' => $message
    ]);

    return ['success' => true];
}

add_action('admin_menu', function() {
    add_menu_page(
        'Contact Form Submissions',   
        'Contact Form',               
        'manage_options',             
        'contact-form-submissions',   
        'cfr_display_table',          
        'dashicons-email',            
        6                            
    );
});

function cfr_display_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_form';

    // Procesar borrado
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Borrar todos los registros
        if (!empty($_POST['cfr_delete_all'])) {
            $wpdb->query("TRUNCATE TABLE $table_name");
            echo '<div class="notice notice-success"><p>Todos los registros han sido eliminados.</p></div>';
        }

        // Borrar un registro individual
        if (!empty($_POST['cfr_delete_id'])) {
            $id_to_delete = intval($_POST['cfr_delete_id']);
            $wpdb->delete($table_name, ['id' => $id_to_delete]);
            echo '<div class="notice notice-success"><p>Registro eliminado correctamente.</p></div>';
        }
    }

    // Consultamos la tabla después de cualquier acción
    $results = $wpdb->get_results("SELECT * FROM $table_name ORDER BY date DESC");

    echo '<div class="wrap"><h1>Contact Form Submissions</h1>';

    // Botón borrar todos
    echo '<form method="post" style="margin-bottom: 1rem;">';
    echo '<input type="hidden" name="cfr_delete_all" value="1">';
    echo '<button type="submit" class="button button-danger" onclick="return confirm(\'¿Seguro que quieres borrar todos los registros?\')">Borrar todos los registros</button>';
    echo '</form>';

    // Tabla
    echo '<table class="widefat fixed" cellspacing="0">';
    echo '<thead><tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr></thead><tbody>';

    if ($results) {
        foreach ($results as $row) {
            echo '<tr>';
            echo '<td>' . esc_html($row->id) . '</td>';
            echo '<td>' . esc_html($row->name) . '</td>';
            echo '<td>' . esc_html($row->secondname) . '</td>';
            echo '<td>' . esc_html($row->email) . '</td>';
            echo '<td>' . esc_html($row->phone) . '</td>';
            echo '<td>' . esc_html($row->message) . '</td>';
            echo '<td>' . esc_html($row->date) . '</td>';

            // Botón borrar individual
            echo '<td>';
            echo '<form method="post" style="display:inline;">';
            echo '<input type="hidden" name="cfr_delete_id" value="' . esc_attr($row->id) . '">';
            echo '<button type="submit" class="button button-small button-danger" onclick="return confirm(\'¿Seguro que quieres borrar este registro?\')">Borrar</button>';
            echo '</form>';
            echo '</td>';

            echo '</tr>';
        }
    } else {
        echo '<tr><td colspan="8">No hay registros.</td></tr>';
    }

    echo '</tbody></table></div>';
}